import { createContext, useContext, useState } from "react";

interface MyShopContextProviderPropType {
  children: React.ReactNode;
}

interface ContextType {
  isSidebarOpen: boolean;
  handleIsSidebarOpen: () => void;
}

const MyShopContext = createContext<ContextType | null>(null);

export function MyShopContextProvider({
  children,
}: MyShopContextProviderPropType) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleIsSidebarOpen() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <MyShopContext.Provider
      value={{
        isSidebarOpen,
        handleIsSidebarOpen,
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
