import ProductCard from "../components/Main/ProductCard";
import ProductCardBody from "../components/Main/ProductCardBody";
import ProductCardFooter from "../components/Main/ProductCardFooter";
import ProductCardHeader from "../components/Main/ProductCardHeader";
import { useMyShopContext } from "../contexts/MyShopContext";
import { Product } from "../interfaces";

export default function Homepage() {
  const { state, search } = useMyShopContext();

  const products: Product[] =
    search.length > 0
      ? state.products.filter((product) => {
          return `${product.title} ${product.description}`
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      : state.products;

  return (
    <section>
      <h2>Latest Products</h2>
      <div className="flex flex-wrap gap-16 justify-center duration-500">
        {state.error && <p>Failure Loading Data</p>}
        {state.loading && <p>Loading Data...</p>}
        {products.map((product) => {
          return (
            <ProductCard key={product.id}>
              <ProductCardHeader product={product} />
              <ProductCardBody product={product} />
              <ProductCardFooter product={product} />
            </ProductCard>
          );
        })}
      </div>
    </section>
  );
}
