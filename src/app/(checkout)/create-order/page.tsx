import CreateOrderAfterPayment from "@/components/custom/checkOut/CreateOrderAfterPayment";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful | Fit Flair",
  description:
    "Your payment has been processed successfully. Fit Flair is now preparing your order for shipment — thank you for shopping with us!",
};

const CreateOrder = () => {
  return <CreateOrderAfterPayment />;
};

export default CreateOrder;
