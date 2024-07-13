import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

  const handleIsSidebarOpen = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handlePlusCartItemQuantity = useCallback((cartItem: CartItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === cartItem.product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: parseFloat(
                (item.product.price * (item.quantity + 1)).toFixed(2)
              ),
            }
          : item
      )
    );
  }, []);

  const handleDeleteCartItem = useCallback((cartItem: CartItem) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== cartItem.product.id)
    );
  }, []);

  const handleMinusCartItemQuantity = useCallback((cartItem: CartItem) => {
    setCart((prevCart) =>
      cartItem.quantity <= 1
        ? prevCart.filter((item) => item.product.id !== cartItem.product.id)
        : prevCart.map((item) =>
            item.product.id === cartItem.product.id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: parseFloat(
                    (item.product.price * (item.quantity - 1)).toFixed(2)
                  ),
                }
              : item
          )
    );
  }, []);

  const handleAddToCart = useCallback((cartItem: CartItem) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find(
        (item) => item.product.id === cartItem.product.id
      );
      if (itemInCart) {
        return prevCart.map((item) =>
          item.product.id === itemInCart.product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: parseFloat(
                  (item.product.price * (item.quantity + 1)).toFixed(2)
                ),
              }
            : item
        );
      }
      return [...prevCart, cartItem];
    });
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    []
  );

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

  const value = useMemo(
    () => ({
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
    }),
    [
      isSidebarOpen,
      state,
      search,
      cart,
      handleIsSidebarOpen,
      handleSearchChange,
      handleSearchSubmit,
      handleAddToCart,
      handleMinusCartItemQuantity,
      handlePlusCartItemQuantity,
      handleDeleteCartItem,
    ]
  );

  return (
    <MyShopContext.Provider value={value}>{children}</MyShopContext.Provider>
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
