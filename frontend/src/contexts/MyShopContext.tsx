import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ProductsData } from "../interfaces";

interface MyShopContextProviderPropinterface {
  children: React.ReactNode;
}

interface Contextinterface {
  isSidebarOpen: boolean;
  handleIsSidebarOpen: () => void;
  state: ProductsData;
  dispatch: React.Dispatch<productAction>;
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
  | { type: "FETCH_SUCCESS"; payload: ProductsData };

function productsReducer(state: ProductsData, action: productAction) {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, loading: true };

    case "FETCH_FAILURE":
      return { ...state, error: true };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        error: false,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export function MyShopContextProvider({
  children,
}: MyShopContextProviderPropinterface) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer<
    React.Reducer<ProductsData, productAction>
  >(productsReducer, initialState);

  function handleIsSidebarOpen() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  useEffect(() => {
    async function getProductData() {
      try {
        dispatch({ type: "FETCH_PRODUCTS" });
        const res = await fetch("https://dummyjson.com/products");
        const data: ProductsData = await res.json();

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
