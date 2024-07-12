import { Route, Routes } from "react-router-dom";
import { useMyShopContext } from "../../contexts/MyShopContext";
import Homepage from "../../pages/Homepage";
import Footer from "../Footer";
import PageNotFound from "../../pages/PageNotFound";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";

export default function Main() {
  const { isSidebarOpen, handleIsSidebarOpen } = useMyShopContext();

  return (
    <main
      onClick={isSidebarOpen ? handleIsSidebarOpen : () => {}}
      className={`${
        isSidebarOpen ? "md:ml-[280px]" : "md:ml-[70px]"
      } duration-500 p-2 h-full`}
    >
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}
