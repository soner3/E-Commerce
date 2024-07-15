import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export default function Paypal() {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId:
      "AT-B86u1Wv7oOu8_SffcrgCgqsvVqXY5tSLbYEcsO6k22Aa93cZbz3brPi8xOKMoJkVestpS8m9vLROc",
    // Add other options as needed
  };

  interface OrderData {
    id: string;
    details?: Array<{
      issue: string;
      description: string;
    }>;
    debug_id?: string;
  }

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const response = await fetch("/my-server/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: [{ id: "YOUR_PRODUCT_ID", quantity: "YOUR_PRODUCT_QUANTITY" }],
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

  return (
    <div className="w-1/2">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons />
      </PayPalScriptProvider>
    </div>
  );
}
