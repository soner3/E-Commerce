import { memo } from "react";
import { ProductCardPropType } from "../../../interfaces";
import Rating from "../Rating";

const ProductCardBody = memo(function ProductCardBody({
  product,
}: ProductCardPropType) {
  return (
    <div className="flex-grow">
      <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
      <p className="mb-1">{product.description}</p>
      <div className="mb-1 flex items-center">
        <Rating value={product.rating} />
        <p className="ml-2">from {product.reviews.length} Reviews</p>
      </div>
      <h4 className="text-2xl font-medium">{product.price}$</h4>
    </div>
  );
});

export default ProductCardBody;
