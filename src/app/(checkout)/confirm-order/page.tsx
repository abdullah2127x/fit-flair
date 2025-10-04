"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  selectShippingCost,
  selectShippingLoading,
  selectShippingError,
  selectShippingAddress,
} from "@/redux/slices/shippingSlice";
import { useAppSelector } from "@/redux/hooks";
import { selectCartSubtotal } from "@/redux/slices/cartSlice";
import CartItemCard from "@/components/custom/cart/CartItemCard";
import SecondaryHeading from "@/components/custom/SecondaryHeading";
import PrimaryHeading from "@/components/custom/PrimaryHeading";

const ConfirmOrder = () => {

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartSubtotal = useAppSelector(selectCartSubtotal);
  const shippingCost = useAppSelector(selectShippingCost);
  const isShippingLoading = useAppSelector(selectShippingLoading);
  const shippingError = useAppSelector(selectShippingError);
  const shippingAddress = useAppSelector(selectShippingAddress);

  const orderTotal = cartSubtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
        <p className="mb-8">
          Add some items to your cart before proceeding to checkout.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PrimaryHeading className="text-center mb-8">
        Confirm Your Order
      </PrimaryHeading>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Cart Items */}
        <div className="flex-1">
          <div className="bg-secondary/10 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Order Items ({cartItems.length})
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.colorName}`}
                  className="bg-background rounded-md"
                >
                  <CartItemCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-secondary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Shipping Information
            </h2>

            {shippingAddress ? (
              <div className="bg-background p-4 rounded-md">
                <p className="font-medium">Shipping to:</p>
                <p>Country: {shippingAddress.country}</p>
                <p>Postal Code: {shippingAddress.postalCode}</p>
              </div>
            ) : (
              <div className="bg-background p-4 rounded-md">
                <p className="text-amber-600">No shipping address provided.</p>
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <Link href="/calculate-shipping">Add Shipping Address</Link>
                </Button>
              </div>
            )}

            {isShippingLoading && (
              <p className="text-sm text-gray-500 mt-4">
                Calculating shipping...
              </p>
            )}

            {shippingError && (
              <p className="text-sm text-red-500 mt-4">{shippingError}</p>
            )}
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="lg:w-[400px]">
          <div className="bg-secondary/30 rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>
                  {shippingCost > 0
                    ? `$${shippingCost.toFixed(2)}`
                    : "Not calculated"}
                </span>
              </div>

              <div className="h-px bg-gray-300 my-2"></div>

              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={!shippingAddress || shippingCost <= 0}
                asChild
              >
                <Link href="get-payment" className="flex gap-2">
                  Proceed to Payment
                  <ArrowRight className=" h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/shopping-cart">Back to Cart</Link>
              </Button>
            </div>

            {(!shippingAddress || shippingCost <= 0) && (
              <p className="text-sm text-amber-600 mt-4">
                Please add a shipping address before proceeding to payment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
