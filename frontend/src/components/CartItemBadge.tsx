import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function CartItemBadge() {
  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <span className="absolute top-2 right-2 w-6 rounded-full bg-red-500 text-white flex justify-center">
      {cart.length >= 9 ? "+9" : cart.length}
    </span>
  );
}
