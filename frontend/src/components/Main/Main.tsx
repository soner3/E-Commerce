import { useMyShopContext } from "../../contexts/MyShopContext";
import Homepage from "../../pages/Homepage";

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
      <Homepage />
    </main>
  );
}
