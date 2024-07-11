import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <h1 className="text-3xl font-bold py-3">Welcome to MyShop</h1>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </main>
  );
}
