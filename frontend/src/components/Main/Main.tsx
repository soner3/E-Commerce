import { Route, Routes } from "react-router-dom";
import { useMyShopContext } from "../../contexts/MyShopContext";
import Footer from "../Footer";
import { lazy, Suspense } from "react";
import LoadingScreen from "../../pages/LoadingScreen";

// import PageNotFound from "../../pages/PageNotFound";
// import ProductPage from "../../pages/ProductPage";
// import CartPage from "../../pages/CartPage";
// import Homepage from "../../pages/Homepage";

const Homepage = lazy(() => import("../../pages/Homepage"));
const CartPage = lazy(() => import("../../pages/CartPage"));
const ProductPage = lazy(() => import("../../pages/ProductPage"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound"));

export default function Main() {
  const { isSidebarOpen, handleIsSidebarOpen } = useMyShopContext();

  return (
    <main
      onClick={isSidebarOpen ? handleIsSidebarOpen : () => {}}
      className={`${
        isSidebarOpen ? "md:ml-[280px]" : "md:ml-[70px]"
      } duration-500 p-2 h-full`}
    >
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </main>
  );
}
