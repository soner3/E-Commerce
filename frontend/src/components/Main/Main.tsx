import { useMyShopContext } from "../../contexts/MyShopContext";

// https://dummyjson.com/products

export default function Main() {
  const { isSidebarOpen, handleIsSidebarOpen } = useMyShopContext();

  return (
    <main
      onClick={isSidebarOpen ? handleIsSidebarOpen : () => {}}
      className={`${
        isSidebarOpen ? "md:ml-[280px]" : "md:ml-[70px]"
      } duration-500 h-screen`}
    >
      <h1 className="text-3xl font-bold py-3">Hallo Welt</h1>
    </main>
  );
}
