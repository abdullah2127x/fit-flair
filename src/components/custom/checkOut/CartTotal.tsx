"use client";
import SecondaryHeading from "@/components/custom/SecondaryHeading";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCartSubtotal } from "@/redux/slices/cartSlice";
import Link from "next/link";

const CartTotal = ({ linkUrl }: { linkUrl: string }) => {
  const subTotal = useAppSelector(selectCartSubtotal);

  const summary = [
    { label: "Subtotal:", value: `$${subTotal.toFixed(2)}` },
    { label: "Total:", value: `$${subTotal.toFixed(2)}` }, // you can compute differently if needed
  ];

  return (
    <div className="flex flex-col gap-4">
      <SecondaryHeading className="text-center">Cart Total</SecondaryHeading>
      <div className="bg-secondary/30 rounded-md p-6 w-full">
        {summary.map(({ label, value }, i) => (
          <div className="flex flex-col gap-4" key={i}>
            <div className="flex justify-between ">
              <span className="text-primary-foreground font-semibold">
                {label}
              </span>
              <span>{value}</span>
            </div>
            {i < summary.length && (
              <div className="w-full h-[2px] bg-primary-foreground/40 mb-4" />
            )}
          </div>
        ))}

        <div className="flex items-start gap-x-2">
          <input
            type="checkbox"
            className="accent-secondary-foreground mt-1"
            id="taxes"
          />
          <label
            htmlFor="taxes"
            className="text-secondary-foreground text-sm mb-8"
          >
            Shipping & taxes calculated at checkout.
          </label>
        </div>

        <Button variant="secondary" size="lg" className="w-full" asChild>
          <Link href={linkUrl}>Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
