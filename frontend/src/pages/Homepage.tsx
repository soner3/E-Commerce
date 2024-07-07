import { useMyShopContext } from "../contexts/MyShopContext";

export default function Homepage() {
  const { state } = useMyShopContext();

  return (
    <section>
      <h1>Latest Products</h1>
      <div className="flex flex-wrap gap-3">
        {state.products.map((product) => {
          return (
            <div key={product.id} className="p-2 border rounded shadow">
              <h2 className="text-2xl font-medium">{product.title}</h2>
              <p>{product.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
