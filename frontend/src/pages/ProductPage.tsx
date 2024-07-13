import { useNavigate, useLocation } from "react-router-dom";
import { useMyShopContext } from "../contexts/MyShopContext";
import { useCallback, useEffect, useState } from "react";
import Rating from "../components/Main/Rating";
import ProductTableData from "../components/Main/Productpage/ProductTableData";
import { BsCartPlusFill } from "react-icons/bs";

export default function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, handleAddToCart } = useMyShopContext();
  const [quantity, setQuantity] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const hanndlePlusQunatity = useCallback(function hanndlePlusQunatity() {
    setQuantity((quantity) => quantity + 1);
  }, []);

  const hanndleMinusQunatity = useCallback(function hanndleMinusQunatity() {
    setQuantity((quantity) => (quantity - 1 <= 0 ? 1 : quantity - 1));
  }, []);

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  const product = state.products.find((product) => product.id === id);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!id || !product) {
    return null;
  }

  return (
    <section className="flex flex-col items-center my-5">
      <h2 id="top" className="text-2xl font-bold mb-2">
        {product.title}
      </h2>
      <div className="h-full border flex flex-col items-center rounded-lg shadow-lg shadow-sky-500 md:w-3/4">
        <div className="p-2 hover:scale-110 duration-300">
          <img
            src={product.images[0]}
            alt="Product Picture"
            className="object-cover w-64"
          />
        </div>
        <div className="flex justify-center gap-5 border-t border-b w-full p-1">
          {product.tags.map((tag) => {
            return (
              <div
                key={tag}
                className="font-serif font-semibold capitalize rounded-full p-2 my-2 bg-sky-500 text-white"
              >
                {tag}
              </div>
            );
          })}
        </div>
        <p className="font-medium p-2 border-b w-full">{product.description}</p>
        <div className="flex pb-1 my-2 items-center border-b w-full justify-center">
          <Rating value={product.rating} />
        </div>
        <div className="flex w-full justify-center pb-2 text-2xl font-semibold border-b">
          Price: ${product.price}
        </div>
        <div className="w-full p-2 flex justify-center border-b">
          <table className="table-auto border-collapse w-3/4 m-2 text-center">
            <caption className="caption-top text-xl font-medium mb-4">
              Product Information
            </caption>
            <tbody>
              <tr>
                <td className="bg-sky-500 text-white uppercase font-bold border-t border-b border-sky-600">
                  Brand
                </td>
                <td className="border-t border-b">
                  {product.brand ?? "No Brand"}
                </td>
              </tr>
              <ProductTableData
                label="Stock"
                information={product.stock.toString()}
              />
              <ProductTableData
                label="Availability"
                information={product.availabilityStatus}
              />
              <ProductTableData label="Sku" information={product.sku} />
              <tr>
                <td className="bg-sky-500 text-white uppercase font-bold border-t border-b border-sky-600">
                  Weight
                </td>
                <td className="border-t border-b">{product.weight}kg</td>
              </tr>
              <tr>
                <td className="bg-sky-500 text-white uppercase font-bold border-t border-b border-sky-600">
                  Dimensions
                </td>
                <td className="border-t border-b flex flex-col">
                  <div>Height: {product.dimensions.height}cm</div>
                  <div>Width: {product.dimensions.width}cm</div>
                  <div>Depth: {product.dimensions.depth}cm</div>
                </td>
              </tr>
              <ProductTableData
                label="Warranty"
                information={product.warrantyInformation}
              />
              <ProductTableData
                label="Shipping"
                information={product.shippingInformation}
              />
              <ProductTableData
                label="Return Policy"
                information={product.returnPolicy}
              />
              <ProductTableData
                label="Barcode"
                information={product.meta.barcode}
              />
            </tbody>
          </table>
        </div>
        <div className="flex flex-col w-full items-center gap-3 p-4 border-b">
          <div className="flex justify-center items-center">
            <button
              onClick={hanndleMinusQunatity}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-l"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={hanndlePlusQunatity}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-r"
            >
              +
            </button>
          </div>
          <button className="w-3/4 rounded-full p-3 text-sky-500 border border-sky-500 font-medium text-lg active:bg-sky-500 active:text-white">
            <div
              onClick={() =>
                handleAddToCart({
                  product: product,
                  quantity: quantity,
                  totalPrice: Number((product.price * quantity).toFixed(2)),
                })
              }
              className="flex justify-center items-center gap-2 hover:scale-110 duration-500"
            >
              <BsCartPlusFill className="size-6 mb-1" />
              <span>Add To Cart</span>
            </div>
          </button>
        </div>
        <div className="w-full p-2 flex justify-center border-b">
          <table className="table-auto border-collapse w-3/4 m-2 text-center">
            <caption className="caption-top text-xl font-medium mb-4">
              Latest Ratings
            </caption>
            <tbody>
              {product.reviews.map((review) => {
                return (
                  <tr>
                    <td className="bg-sky-500 text-white uppercase font-bold border-t border-b border-sky-600">
                      {review.reviewerName}
                    </td>
                    <td className="border-t border-b flex flex-col">
                      <div>{review.comment}</div>
                      <div className="flex justify-center items-center">
                        <Rating value={review.rating} showValue={false} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
