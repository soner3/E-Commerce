import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface OrderData {
  id: string;
  details?: Array<{
    issue: string;
    description: string;
  }>;
  debug_id?: string;
}

interface PaypaylCartItem {
  id: string;
  quantity: number;
}

export default function Paypal() {
  const { cart } = useSelector((state: RootState) => state.cart);

  const paypalCart: PaypaylCartItem[] = cart.map((item) => {
    return { id: item.product.id, quantity: item.quantity };
  });

  const total = cart.reduce((accumulator, item) => {
    return accumulator + item.totalPrice;
  }, 0);

  const initialOptions: ReactPayPalScriptOptions = {
    clientId:
      "AT-B86u1Wv7oOu8_SffcrgCgqsvVqXY5tSLbYEcsO6k22Aa93cZbz3brPi8xOKMoJkVestpS8m9vLROc",
  };

  const Style: PayPalButtonsComponentProps["style"] = {
    layout: "vertical",
    shape: "pill",
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const response = await fetch("/my-server/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: paypalCart,
        }),
      });

      const orderData: OrderData = await response.json();

      if (!orderData.id) {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    const response = await fetch("/my-server/capture-paypal-order", {
      method: "POST",
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });

    const details = await response.json();

    alert(`Transaction completed by ${details.payer.name.given_name}`);
  };

  return (
    <div className="w-1/2 z-0">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={Style}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
}
