import { BsFilterLeft, BsList } from "react-icons/bs";
import { useMyShopContext } from "../contexts/MyShopContext";

export default function NavbarButton() {
  const { isSidebarOpen, handleIsSidebarOpen } = useMyShopContext();

  return (
    <button
      onClick={handleIsSidebarOpen}
      className={`transform transition-transform duration-500 ${
        isSidebarOpen ? "rotate-180" : "ease-linear"
      } rounded-full p-1 hover:bg-gray-200 focus:bg-gray-200 dark:hover:text-black dark:focus:text-black`}
    >
      {isSidebarOpen ? (
        <BsFilterLeft className="size-9 -rotate-180" />
      ) : (
        <BsList className="size-9" />
      )}
    </button>
  );
}
