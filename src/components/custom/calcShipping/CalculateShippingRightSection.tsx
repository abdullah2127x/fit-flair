import React from "react";

import CartTotal from "@/components/custom/checkOut/CartTotal";
import CalcCartItems from "./CalcCartItems";

const CalculateShippingRightSection = () => {
  return (
    <div className="flex flex-col  gap-10">
      <CartTotal linkUrl="/get-payment" />
      <CalcCartItems />
    </div>
  );
};

export default CalculateShippingRightSection;
