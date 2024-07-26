import { useSelector } from "react-redux";
import ProductCard from "../components/Main/Homepage/ProductCard";
import ProductCardBody from "../components/Main/Homepage/ProductCardBody";
import ProductCardFooter from "../components/Main/Homepage/ProductCardFooter";
import ProductCardHeader from "../components/Main/Homepage/ProductCardHeader";
import ProductCarousel from "../components/Main/Homepage/ProductCarousel";
import { Product } from "../interfaces";
import LoadingScreen from "./LoadingScreen";
import { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../features/productService";

export default function Homepage() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { search } = useSelector((state: RootState) => state.search);

  if (products === undefined) {
    return <LoadingScreen />;
  }

  const filteredProducts: Product[] =
    search.length > 0
      ? products.filter((product) => {
          return `${product.title} ${product.description}`
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      : products;

  return (
    <section>
      {error && <p>Failure Loading Data</p>}
      {isLoading && <LoadingScreen />}
      {products.length > 0 && (
        <>
          <h1 className="text-3xl text-center font-bold py-3">
            Welcome to MyShop
          </h1>
          <ProductCarousel products={products} />
          <br />
          <div className="flex flex-wrap gap-16 justify-center duration-500">
            {filteredProducts.map((product) => {
              return (
                <ProductCard key={product.id}>
                  <ProductCardHeader product={product} />
                  <ProductCardBody product={product} />
                  <ProductCardFooter product={product} />
                </ProductCard>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
