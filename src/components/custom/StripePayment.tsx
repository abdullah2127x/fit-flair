// "use client";

// import convertToSubCurrency from "@/lib/convertToSubCurrency";
// import CheckoutPage from "./CheckoutPage";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useShoppingCart } from "use-shopping-cart";

// if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
//   throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
// }

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// const StripePayment = () => {
//   const { totalPrice } = useShoppingCart();
//   console.log(
//     "the total price is ",
//     totalPrice,
//     "and the type of total price is ",
//     typeof totalPrice
//   );
//   const amount = 54;
//   //   const amount = totalPrice?.toFixed(2);
//   return (
//     <div>
//       <h1 className="text-6xl font-bold text-center">
//         Ali Jawwad has requested $ {amount}
//       </h1>

//       <Elements
//         stripe={stripePromise}
//         options={{
//           mode: "payment",
//           amount: convertToSubCurrency(amount),
//           currency: "usd",
//         }}
//       >
//         <CheckoutPage amount={amount} />
//       </Elements>
//     </div>
//   );
// };

// export default StripePayment;

"use client";

import convertToSubCurrency from "@/lib/convertToSubCurrency";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CheckoutPage from "./checkOut/CheckOutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripePayment = () => {
  //   const { totalPrice } = useShoppingCart();

    const totalPrice = 4000;

  // If totalPrice is 0, display a loading message or placeholder
//   if (totalPrice === 0) {
//     return (
//       <div>
//         <h1 className="text-3xl font-medium text-center flex justify-center items-center gap-5">
//           <AiOutlineLoading3Quarters />
//           Loading...
//         </h1>
//       </div>
//     );
//   }

  // Format the total price for display and calculations
  const amount = parseFloat((totalPrice as number).toFixed(2));

  console.log(
    "The total price is ",
    totalPrice,
    "and the type of total price is ",
    typeof totalPrice
  );

  return (
    <div>
      <h1 className="text-6xl font-bold text-center">
        Hecto requested you to pay ${amount} to place your order
      </h1>

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
};

export default StripePayment;
