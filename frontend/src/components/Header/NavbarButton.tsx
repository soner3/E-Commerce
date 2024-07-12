import { BsFilterLeft, BsList } from "react-icons/bs";
import { useMyShopContext } from "../../contexts/MyShopContext";

export default function NavbarButton() {
  const { isSidebarOpen, handleIsSidebarOpen, cart } = useMyShopContext();

  return (
    <button
      onClick={handleIsSidebarOpen}
      className={`transform transition-transform duration-500 ${
        isSidebarOpen ? "rotate-180" : "ease-linear"
      } rounded-full p-1 duration-500 relative`}
    >
      {isSidebarOpen ? (
        <BsFilterLeft className="size-9 -rotate-180" />
      ) : (
        <BsList className="size-9" />
      )}
      {cart.length <= 0 ? (
        ""
      ) : (
        <span
          className={`absolute top-0 right-0 w-6 md:hidden rounded-full bg-red-500 text-white flex justify-center ${
            isSidebarOpen ? "hidden" : ""
          }`}
        >
          {cart.length >= 9 ? "+9" : cart.length}
        </span>
      )}
    </button>
  );
}
