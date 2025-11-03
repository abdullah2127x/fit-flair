import React from "react";
import OrderCompleted from "./comp/PaymentSuccessPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Fit Flair",
  description:
    "Your payment was successful! Thank you for shopping with Fit Flair — your order is being processed and will be on its way soon.",
};

const PaymentSuccess = () => {
  return <OrderCompleted />;
};

export default PaymentSuccess;
