import { BsTrash3Fill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  cartItemQuantityMinus,
  cartItemQuantityPlus,
  deleteCartItem,
} from "../features/cartSlice";
import Paypal from "../components/Main/Cartpage/Paypal";

export default function CartPage() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((accumulator, item) => {
    return accumulator + item.totalPrice;
  }, 0);

  if (cart.length <= 0) {
    return (
      <div className="bg-red-200 text-red-700 text-xl font-medium rounded-lg border my-10 text-center shadow-lg shadow-red-400 border-red-700 p-4">
        Your Cart Is Empty
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col mx-auto my-10 p-4 shadow-lg shadow-sky-500 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>
        <table className="table-auto border-collapse">
          <caption className="caption-top text-2xl font-medium mb-4">
            Total Price: ${total.toFixed(2)}
          </caption>
          <thead className="uppercase text-center bg-sky-500 text-white">
            <tr>
              <th className="py-3 px-2">Product Title</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">Quantity</th>
              <th className="py-3 px-2">Total Price</th>
              <th className="py-3 px-2">Delete</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {cart.map((item) => (
              <tr
                key={item.product.id}
                className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <td className="py-3 px-2 text-center">{item.product.title}</td>
                <td className="py-3 px-2 text-center">
                  ${item.product.price.toFixed(2)}
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex px-2 justify-center items-center">
                    <button
                      onClick={() => dispatch(cartItemQuantityMinus(item))}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(cartItemQuantityPlus(item))}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  ${item.totalPrice.toFixed(2)}
                </td>
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => dispatch(deleteCartItem(item))}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded"
                  >
                    <BsTrash3Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="flex justify-center w-full">
        <Paypal />
      </div> */}
    </section>
  );
}
