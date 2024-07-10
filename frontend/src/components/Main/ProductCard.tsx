import { BsCartPlusFill, BsInfoCircleFill } from "react-icons/bs";
import { Product } from "../../interfaces";
import Rating from "./Rating";

interface ProductCardPropType {
  product: Product;
}

export default function ProductCard({ product }: ProductCardPropType) {
  return (
    <div className="border dark:border-sky-500 w-full md:w-80 rounded shadow-lg shadow-sky-500 p-4 flex gap-10 flex-col h-auto">
      <div className="flex justify-center items-center mb-4">
        <img
          src={product.images[0]}
          alt="Product Picture"
          className="object-cover w-32 h-32"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
        <p className="mb-1">{product.description}</p>
        <div className="mb-1 flex items-center">
          <Rating value={product.rating} />
          <p className="ml-2">from {product.reviews.length} Reviews</p>
        </div>
        <h4 className="text-2xl font-medium">{product.price}$</h4>
      </div>
      <div className="mt-auto flex mb-1">
        <button className="w-full rounded-l-full p-3 text-sky-500 duration-500 border border-sky-500 hover:bg-sky-500 hover:text-white hover:dark:text-slate-900 font-medium text-lg">
          <div className="flex justify-center items-center gap-2">
            <BsInfoCircleFill className="size-6 mb-1" />
            <span>Details</span>
          </div>
        </button>
        <button className="w-full rounded-r-full p-3 text-sky-500 duration-500 border border-sky-500 hover:bg-sky-500 hover:text-white hover:dark:text-slate-900 font-medium text-lg">
          <div className="flex justify-center items-center gap-2">
            <BsCartPlusFill className="size-6 mb-1" />
            <span>Add</span>
          </div>
        </button>
      </div>
    </div>
  );
}
