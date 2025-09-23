"use client";
import React from "react";
import CalculateShippingCard from "@/components/custom/checkOut/CalculateShippingCard";
import CartTotal from "@/components/custom/checkOut/CartTotal";

const ShoppingCartRightSection = () => {
  return (
    <div className="flex flex-col w-full md:w-[371px] gap-12">
      <CartTotal linkUrl="/calculate-shipping" />
      <CalculateShippingCard />
    </div>
  );
};

export default ShoppingCartRightSection;
