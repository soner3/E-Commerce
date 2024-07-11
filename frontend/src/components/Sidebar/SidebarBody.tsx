import { useMyShopContext } from "../../contexts/MyShopContext";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function SidebarBody() {
  const { isSidebarOpen, cart } = useMyShopContext();

  return (
    <ul className="flex flex-col flex-grow">
      {isSidebarOpen ? (
        <>
          <a href={"#"} className="w-full">
            <li className="p-2 mb-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex gap-3 relative">
              <div>
                <FaShoppingCart
                  className={`${isSidebarOpen ? "size-5" : "size-7"}`}
                />
              </div>
              <p>Cart</p>
              {cart.length <= 0 ? (
                ""
              ) : (
                <span className="absolute top-2 right-2 w-6 rounded-full bg-red-500 text-white flex justify-center">
                  {cart.length >= 9 ? "9+" : cart.length}
                </span>
              )}
            </li>
          </a>
          <a href={"#"} className="w-full">
            <li className="p-2 mb-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex gap-3">
              <div className="relative">
                <FaUser className={`${isSidebarOpen ? "size-5" : "size-7"}`} />
              </div>
              <p>Login</p>
            </li>
          </a>
        </>
      ) : (
        <>
          <a href={"#"} className="w-full">
            <li className="p-5 border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer relative">
              <div>
                <FaShoppingCart
                  className={`${isSidebarOpen ? "size-5" : "size-7"}`}
                />
                {cart.length <= 0 ? (
                  ""
                ) : (
                  <span className="absolute top-3 right-2 w-6 rounded-full bg-red-500 text-white flex justify-center">
                    {cart.length >= 9 ? "9+" : cart.length}
                  </span>
                )}
              </div>
            </li>
          </a>
          <a href={"#"} className="w-full">
            <li className="p-5 border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer">
              <div>
                <FaUser className={`${isSidebarOpen ? "size-5" : "size-7"}`} />
              </div>
            </li>
          </a>
        </>
      )}
    </ul>
  );
}
