import { BsFilterLeft, BsList } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { handleSidebar } from "../../features/sidebarSlice";

export default function NavbarButton() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(handleSidebar())}
      className={`transform transition-transform duration-500 ${
        isSidebarOpen ? "rotate-180" : "ease-linear"
      } rounded-full p-1 duration-500 relative active:bg-sky-500 active:text-white`}
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
