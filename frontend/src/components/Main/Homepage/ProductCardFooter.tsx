import { BsCartPlusFill, BsInfoCircleFill } from "react-icons/bs";
import { useMyShopContext } from "../../../contexts/MyShopContext";
import { ProductCardPropType, CartItem } from "../../../interfaces";
import { Link } from "react-router-dom";
import { memo } from "react";

const ProductCardFooter = memo(function ProductCardFooter({
  product,
}: ProductCardPropType) {
  const { handleAddToCart } = useMyShopContext();
  const cartItem: CartItem = {
    product: product,
    quantity: 1,
    totalPrice: product.price,
  };

  return (
    <div className="mt-auto flex mb-1 rounded-full bg-white">
      <Link
        to={`product?id=${product.id}`}
        className="w-full rounded-l-full p-3 text-sky-500 duration-500 border border-sky-500 font-medium text-lg active:bg-sky-500 active:text-white"
      >
        <div className="flex justify-center items-center gap-2 hover:scale-110 duration-500">
          <BsInfoCircleFill className="size-6 mb-1" />
          <span>Details</span>
        </div>
      </Link>

      <button
        onClick={() => handleAddToCart(cartItem)}
        className="w-full rounded-r-full p-3 text-sky-500 border border-sky-500 font-medium text-lg active:bg-sky-500 active:text-white"
      >
        <div className="flex justify-center items-center gap-2 hover:scale-110 duration-500 ">
          <BsCartPlusFill className="size-6 mb-1" />
          <span>Add</span>
        </div>
      </button>
    </div>
  );
});

export default ProductCardFooter;
