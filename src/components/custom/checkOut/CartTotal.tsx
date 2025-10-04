"use client";
import SecondaryHeading from "@/components/custom/SecondaryHeading";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCartSubtotal } from "@/redux/slices/cartSlice";
import Link from "next/link";
import { selectShippingCost } from "@/redux/slices/shippingSlice";

const CartTotal = ({ usedFor }: { usedFor: "calc-ship" | "shop-cart" }) => {
  const cartSubTotal = useAppSelector(selectCartSubtotal);
  const shippingCost = useAppSelector(selectShippingCost);
  const orderTotal = cartSubTotal + (shippingCost || 0);

  // const summary = [
  //   { label: "Subtotal:", value: `$${subTotal.toFixed(2)}` },
  //   { label: "Total:", value: `$${subTotal.toFixed(2)}` }, // you can compute differently if needed
  // ];

  return (
    <div className="flex flex-col gap-4">
      <SecondaryHeading className="text-center">Cart Total</SecondaryHeading>
      <div className="bg-secondary/30 rounded-md p-6 w-full">
        <div className="flex flex-col gap-4">
          {/* subTotal */}
          <div className="flex justify-between ">
            <span className="text-primary-foreground font-semibold">
              Sub Total
            </span>
            <span>{cartSubTotal.toFixed(2)}</span>
          </div>

          {/* line */}
          <div className="w-full h-[2px] bg-primary-foreground/40 mb-4" />
          {/* shipping cose */}
          <div className="flex justify-between ">
            <span className="text-primary-foreground font-semibold">
              Shipping Cost
            </span>
            <span>
              {shippingCost > 0
                ? `$${shippingCost.toFixed(2)}`
                : "Not calculated"}
            </span>
          </div>

          {/* line */}
          <div className="w-full h-[2px] bg-primary-foreground/40 mb-4" />
          {/* total */}
          <div className="flex justify-between ">
            <span className="text-primary-foreground font-semibold">Total</span>
            <span>{`$${orderTotal.toFixed(2)}`}</span>
          </div>

          {/* line */}
          <div className="w-full h-[2px] bg-primary-foreground/40 mb-4" />
        </div>

        {/* <div className="flex items-start gap-x-2">
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
        </div> */}

        {usedFor == "shop-cart" && (
          <Button variant="secondary" size="lg" className="w-full" asChild>
            <Link href={"calculate-shipping"}>Proceed to Checkout</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
