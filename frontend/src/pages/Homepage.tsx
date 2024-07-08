import ProductCard from "../components/Main/ProductCard";
import { useMyShopContext } from "../contexts/MyShopContext";

export default function Homepage() {
  const { state } = useMyShopContext();

  return (
    <section>
      <h2>Latest Products</h2>
      <div className="flex flex-wrap gap-3">
        {state.error && <p>Failure Loading Data</p>}
        {state.loading && <p>Loading Data...</p>}
        {state.products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </section>
  );
}
