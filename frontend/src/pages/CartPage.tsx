import { useMyShopContext } from "../contexts/MyShopContext";

export default function CartPage() {
  const { cart, handleMinusCartItemQuantity, handlePlusCartItemQuantity } =
    useMyShopContext();

  if (cart.length <= 0) {
    return (
      <div className="bg-red-200 text-red-700 text-xl font-medium rounded-lg border my-10 text-center shadow-lg shadow-red-400 border-red-700 p-4">
        Your Cart Is Empty
      </div>
    );
  }

  return (
    <div className="my-10">
      <table className="table-fixed w-full ">
        <thead className="table-row">
          <th>Product Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </thead>
        <tbody className="text-center">
          {cart.map((item) => {
            return (
              <tr key={item.product.id}>
                <td className="text-left font-medium">{item.product.title}</td>
                <td>{item.product.price}$</td>

                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => handleMinusCartItemQuantity(item)}
                    className="bg-red-500 px-2 font-medium text-white"
                  >
                    -
                  </button>
                  <td className="font-medium">{item.quantity}</td>
                  <button
                    onClick={() => handlePlusCartItemQuantity(item)}
                    className="bg-green-500 px-2 font-medium text-white"
                  >
                    +
                  </button>
                </div>
                <td className="font-medium">{item.totalPrice}$</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
