import { useMyShopContext } from "../contexts/MyShopContext";

export default function CartItemBadge() {
  const { cart } = useMyShopContext();

  return (
    <span className="absolute top-2 right-2 w-6 rounded-full bg-red-500 text-white flex justify-center">
      {cart.length >= 9 ? "+9" : cart.length}
    </span>
  );
}
