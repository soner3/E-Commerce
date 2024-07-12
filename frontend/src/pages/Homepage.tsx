import ProductCard from "../components/Main/Homepage/ProductCard";
import ProductCardBody from "../components/Main/Homepage/ProductCardBody";
import ProductCardFooter from "../components/Main/Homepage/ProductCardFooter";
import ProductCardHeader from "../components/Main/Homepage/ProductCardHeader";
import ProductCarousel from "../components/Main/Homepage/ProductCarousel";
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
      <h1 id="top" className="text-3xl text-center font-bold py-3">
        Welcome to MyShop
      </h1>
      <ProductCarousel />
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
