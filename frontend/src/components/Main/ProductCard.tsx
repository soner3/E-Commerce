import { Product } from "../../interfaces";

interface ProductCardPropType {
  product: Product;
}

export default function ProductCard({ product }: ProductCardPropType) {
  return (
    <div className="border dark:border-sky-500 rounded shadow-xl w-full p-4">
      <div className="flex justify-center items-center mb-4">
        <img
          src={product.images[0]}
          alt="Product Picture"
          className="object-cover w-32 h-32"
        />
      </div>
      <h3 className="text-xl font-medium mb-2">{product.title}</h3>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
}
