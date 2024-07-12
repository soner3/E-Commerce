import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CartItem, Product, ProductsData } from "../interfaces";

interface MyShopContextProviderPropType {
  children: React.ReactNode;
}

interface Contextinterface {
  isSidebarOpen: boolean;
  handleIsSidebarOpen: () => void;
  state: ProductsData;
  dispatch: React.Dispatch<productAction>;
  search: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  cart: CartItem[];
  handleAddToCart: (cartItem: CartItem) => void;
  handlePlusCartItemQuantity: (cartItem: CartItem) => void;
  handleMinusCartItemQuantity: (cartItem: CartItem) => void;
  handleDeleteCartItem: (cartItem: CartItem) => void;
}

const initialState: ProductsData = {
  products: [],
  loading: false,
  error: false,
};

const MyShopContext = createContext<Contextinterface | null>(null);

type productAction =
  | { type: "FETCH_PRODUCTS" }
  | { type: "FETCH_FAILURE" }
  | { type: "FETCH_SUCCESS"; payload: Product[] };

function productsReducer(state: ProductsData, action: productAction) {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, loading: true };

    case "FETCH_FAILURE":
      return { ...state, error: true, loading: false };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: false,
      };

    default:
      throw new Error("Unknown Action");
  }
}

export function MyShopContextProvider({
  children,
}: MyShopContextProviderPropType) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [search, setSearch] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  function handleIsSidebarOpen() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handlePlusCartItemQuantity(cartItem: CartItem) {
    setCart(
      cart.map((item) => {
        return item.product.id === cartItem.product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: parseFloat(
                (item.product.price * (item.quantity + 1)).toFixed(2)
              ),
            }
          : item;
      })
    );
  }

  function handleDeleteCartItem(cartItem: CartItem) {
    setCart(
      cart.filter((item) => {
        return item.product.id !== cartItem.product.id;
      })
    );
  }

  function handleMinusCartItemQuantity(cartItem: CartItem) {
    if (cartItem.quantity <= 1) {
      setCart(
        cart.filter((item) => {
          return item.product.id !== cartItem.product.id;
        })
      );
    } else {
      setCart(
        cart.map((item) => {
          return item.product.id === cartItem.product.id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: parseFloat(
                  (item.product.price * (item.quantity - 1)).toFixed(2)
                ),
              }
            : item;
        })
      );
    }
  }

  function handleAddToCart(cartItem: CartItem) {
    const itemInCart = cart.find((item) => {
      return item.product.id === cartItem.product.id;
    });

    if (itemInCart) {
      setCart(
        cart.map((item) => {
          return item.product.id === itemInCart?.product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: parseFloat(
                  (item.product.price * (item.quantity + 1)).toFixed(2)
                ),
              }
            : item;
        })
      );
    } else {
      setCart([...cart, cartItem]);
    }
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch("");
  }

  useEffect(() => {
    async function getProductData() {
      try {
        dispatch({ type: "FETCH_PRODUCTS" });
        const res = await fetch("http://localhost:8000/products");
        const data: Product[] = await res.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    }

    getProductData();
  }, []);

  return (
    <MyShopContext.Provider
      value={{
        isSidebarOpen,
        handleIsSidebarOpen,
        state,
        dispatch,
        search,
        handleSearchChange,
        handleSearchSubmit,
        cart,
        handleAddToCart,
        handleMinusCartItemQuantity,
        handlePlusCartItemQuantity,
        handleDeleteCartItem,
      }}
    >
      {children}
    </MyShopContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMyShopContext() {
  const context = useContext(MyShopContext);
  if (context === null) {
    throw new Error("MyShopContext used outside of its Provider!");
  }
  return context;
}
