import { memo } from "react";
import { ProductCardPropType } from "../../../interfaces";

const ProductCardHeader = memo(function ProductCardHeader({
  product,
}: ProductCardPropType) {
  return (
    <div className="flex justify-center items-center mb-4 group-hover:scale-125 duration-300 hover:cursor-pointer">
      <img
        src={product.images[0]}
        alt="Product Picture"
        className="object-cover w-auto h-32"
      />
    </div>
  );
});

export default ProductCardHeader;
