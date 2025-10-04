import React from "react";

import CartTotal from "@/components/custom/checkOut/CartTotal";
import CalcCartItems from "./CalcCartItems";

const CalculateShippingRightSection = () => {
  return (
    <div className="flex flex-col  gap-10">
      <CartTotal usedFor= "calc-ship"/>
      <CalcCartItems />
    </div>
  );
};

// Then add it to your component's JSX

export default CalculateShippingRightSection;
