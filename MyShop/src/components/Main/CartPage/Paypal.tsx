import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../../features/cartSlice";

const clientID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

export default function Paypal() {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const amount = cart
    .reduce((accumulator, item) => {
      return accumulator + item.totalPrice;
    }, 0)
    .toFixed(2);
  return (
    <PayPalScriptProvider
      options={{
        clientId: clientID,
      }}
    >
      <div className="flex justify-center w-full">
        <div className="w-1/2 z-0">
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(_, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
            onApprove={async (_, actions) => {
              if (actions.order) {
                await actions.order.capture();
                dispatch(deleteCart());
                navigate("/app");
                alert(
                  "Transaction completed! You will be brought back to the Homepage."
                );
              }
            }}
            onError={(err) => {
              console.error("PayPal Checkout Error:", err);
              alert(
                "An error occurred during the transaction. Please try again."
              );
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
