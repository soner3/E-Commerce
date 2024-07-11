import { BsCartPlusFill, BsInfoCircleFill } from "react-icons/bs";
import { useMyShopContext } from "../../contexts/MyShopContext";
import { ProductCardPropType } from "../../interfaces";

export default function ProductCardFooter({ product }: ProductCardPropType) {
  const { handleAddToCart } = useMyShopContext();

  return (
    <div className="mt-auto flex mb-1 rounded-full bg-white">
      <button className="w-full rounded-l-full p-3 text-sky-500 duration-500 border border-sky-500  font-medium text-lg">
        <div className="flex justify-center items-center gap-2 hover:scale-110 duration-500">
          <BsInfoCircleFill className="size-6 mb-1" />
          <span>Details</span>
        </div>
      </button>
      <button
        onClick={() => handleAddToCart(product)}
        className="w-full rounded-r-full p-3 text-sky-500 duration-500 border border-sky-500 font-medium text-lg"
      >
        <div className="flex justify-center items-center gap-2 hover:scale-110 duration-500">
          <BsCartPlusFill className="size-6 mb-1" />
          <span>Add</span>
        </div>
      </button>
    </div>
  );
}
