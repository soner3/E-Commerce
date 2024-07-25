import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import { lazy, Suspense } from "react";
import LoadingScreen from "../../pages/LoadingScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { handleSidebar } from "../../features/sidebarSlice";
import LoginPage from "../../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";

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
          <Route index element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/app/*"
            element={
              <ProtectedRoutes>
                <Routes>
                  <Route index element={<Homepage />} />
                  <Route path="product" element={<ProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                </Routes>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </main>
  );
}
