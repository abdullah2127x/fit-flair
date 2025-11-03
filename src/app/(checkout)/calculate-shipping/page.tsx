import React from "react";
import CalcShipPage from "./comp/CalcShipPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Shipping | Fit Flair",
  description:
    "Estimate your delivery costs quickly and accurately with Fit Flair’s shipping calculator before completing your purchase.",
};

const CalculateShipping = () => {
  return <CalcShipPage />;
};

export default CalculateShipping;
