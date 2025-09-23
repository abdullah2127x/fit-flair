"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { closeSidebar } from "@/redux/slices/cartSidebarSlice";
import { CartItem } from "@/types/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PrimaryHeading from "../PrimaryHeading";
import CartItemCard from "./CartItemCard";

const CartSidebar = () => {
  const { isOpen } = useSelector((state: any) => state.cartSidebar);
  const { items } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={() => dispatch(closeSidebar())}>
        <SheetContent className="w-[90vw] sm:max-w-md text-darkTextBlue overflow-y-auto">
          <SheetHeader className="flex flex-col gap-3">
            <SheetTitle className="text-primary-foreground">
              <PrimaryHeading>Shopping Cart</PrimaryHeading>
            </SheetTitle>

            <div className="flex flex-col gap-y-5 mt-8">
              {items.length === 0 ? (
                <h3 className="text-xl">You don&apos;t have any items</h3>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    variant={"secondary"}
                    onClick={() => dispatch(closeSidebar())}
                    className="w-full"
                    asChild
                  >
                    <Link href="/shopping-cart">View Cart</Link>
                  </Button>

                  {items.map((item: CartItem) => (
                    <div
                      key={item.productId}
                      onClick={() => {
                        router.push(
                          `/shop/${item.slug}?color=${item.colorName}`
                        );
                        dispatch(closeSidebar());
                      }}
                      className="flex flex-col cursor-pointer items-center bg-secondary/30 rounded-md w-full"
                    >
                      <CartItemCard item={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSidebar;
