import { FaShoppingCart, FaUser } from "react-icons/fa";
import CartItemBadge from "../CartItemBadge";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

export default function SidebarBody() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebar);
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <ul className="flex flex-col flex-grow">
      {isSidebarOpen ? (
        <>
          <NavLink to={"/app"}>
            <li className="p-2 mb-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex gap-3">
              <div className="relative">
                <BsFillHouseDoorFill
                  className={`${isSidebarOpen ? "size-5" : "size-7"}`}
                />
              </div>
              <p>Home</p>
            </li>
          </NavLink>

          <NavLink to={"/app/cart"}>
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
          <li
            onClick={handleLogout}
            className="p-2 mb-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex gap-3"
          >
            <div className="relative">
              <FaUser className={`${isSidebarOpen ? "size-5" : "size-7"}`} />
            </div>
            <p>Logout</p>
          </li>
        </>
      ) : (
        <>
          <NavLink to={"/app/cart"}>
            <li className="p-5 border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer relative">
              <div>
                <FaShoppingCart
                  className={`${isSidebarOpen ? "size-5" : "size-7"}`}
                />
                {cart.length <= 0 ? "" : <CartItemBadge />}
              </div>
            </li>
          </NavLink>
          <li
            onClick={handleLogout}
            className="p-5 border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer"
          >
            <div>
              <FaUser className={`${isSidebarOpen ? "size-5" : "size-7"}`} />
            </div>
          </li>
        </>
      )}
    </ul>
  );
}
