import { useMyShopContext } from "../../contexts/MyShopContext";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import CartItemBadge from "../CartItemBadge";
import { NavLink } from "react-router-dom";

export default function SidebarBody() {
  const { isSidebarOpen, cart } = useMyShopContext();

  return (
    <ul className="flex flex-col flex-grow">
      {isSidebarOpen ? (
        <>
          <NavLink to={"cart"}>
            <li className="p-2 mb-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex gap-3 relative">
              <div>
                <FaShoppingCart
                  className={`${isSidebarOpen ? "size-5" : "size-7"}`}
                />
              </div>
              <p>Cart</p>
              {cart.length <= 0 ? "" : <CartItemBadge />}
            </li>
          </NavLink>

          <li className="p-2 mb-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex gap-3">
            <div className="relative">
              <FaUser className={`${isSidebarOpen ? "size-5" : "size-7"}`} />
            </div>
            <p>Login</p>
          </li>
        </>
      ) : (
        <>
          <NavLink to={"cart"}>
            <li className="p-5 border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer relative">
              <div>
                <FaShoppingCart
                  className={`${isSidebarOpen ? "size-5" : "size-7"}`}
                />
                {cart.length <= 0 ? "" : <CartItemBadge />}
              </div>
            </li>
          </NavLink>

          <li className="p-5 border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer">
            <div>
              <FaUser className={`${isSidebarOpen ? "size-5" : "size-7"}`} />
            </div>
          </li>
        </>
      )}
    </ul>
  );
}
