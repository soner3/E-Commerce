import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import { lazy, Suspense } from "react";
import LoadingScreen from "../../pages/LoadingScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { handleSidebar } from "../../features/sidebarSlice";
import LoginPage from "../../pages/LoginPage";

// import PageNotFound from "../../pages/PageNotFound";
// import ProductPage from "../../pages/ProductPage";
// import CartPage from "../../pages/CartPage";
// import Homepage from "../../pages/Homepage";

const Homepage = lazy(() => import("../../pages/Homepage"));
const CartPage = lazy(() => import("../../pages/CartPage"));
const ProductPage = lazy(() => import("../../pages/ProductPage"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound"));

export default function Main() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <main
      onClick={isSidebarOpen ? () => dispatch(handleSidebar()) : undefined}
      className={`${
        isSidebarOpen ? "md:ml-[280px]" : "md:ml-[70px]"
      } duration-500 p-2 h-full`}
    >
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </main>
  );
}
