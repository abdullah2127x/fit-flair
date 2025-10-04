"use client";

import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkOut/CheckOutPage";
import { useAppSelector } from "@/redux/hooks";
import { selectCartSubtotal } from "@/redux/slices/cartSlice";
import PrimaryHeading from "./PrimaryHeading";
import { selectShippingCost } from "@/redux/slices/shippingSlice";
import FullPageLoader from "./FullPageLoader";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripePayment = () => {
  // Get cart total from Redux
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)  
  }, [])
  
  const cartSubtotal = useAppSelector(selectCartSubtotal);
  const shippingCost = useAppSelector(selectShippingCost);

  const orderTotal = cartSubtotal + shippingCost;

  if (!isClient) {
    return <FullPageLoader 
    // message="loading..." 
    />;
  }
  // If cart is empty, show appropriate message
  if (orderTotal === 0 && isClient) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-medium flex justify-center items-center gap-5">
          {/* <AiOutlineLoading3Quarters className="animate-spin" /> */}
          Your cart is empty
        </h1>
      </div>
    );
  }

  // Format the total price for display and calculations
  const amount = parseFloat(orderTotal.toFixed(2));
  if (isClient) {
    return (
      <div className="container mx-auto p-4 flex flex-col gap-8 min-h-[70vh]">
        {/* <h1 className="text-4xl font-bold text-center mb-8"> */}
        <PrimaryHeading className="text-center">
          Complete your order - ${amount}
        </PrimaryHeading>
        {/* </h1> */}

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    );
  }
};

export default StripePayment;
