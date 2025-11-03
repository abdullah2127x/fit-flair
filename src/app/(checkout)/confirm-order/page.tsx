import React from "react";
import ConfirmOrderPage from "./comp/ConfirmOrderPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Your Order | Fit Flair",
  description:
    "Review your order details and confirm your purchase securely with Fit Flair before final checkout.",
};

const ConfirmOrder = () => {
  return <ConfirmOrderPage />;
};

export default ConfirmOrder;
