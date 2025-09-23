"use client";
import ShoppingCartRightSection from "@/components/custom/cart/ShoppingCartRightSection";
import ShoppingCartLeft from "../../components/custom/cart/ShoppingCartLeftSection";
import { useAppSelector } from "@/redux/hooks";
import { selectCartCount } from "@/redux/slices/cartSlice";
import SecondaryHeading from "@/components/custom/SecondaryHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import FullPageLoader from "@/components/custom/FullPageLoader";

export default function ShoppingCartPage() {
  const cartCount = useAppSelector(selectCartCount);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <FullPageLoader />;
  }

  return (
    <>
      {(cartCount as number) > 0 ? (
        <div className="container mx-auto relative overflow-hidden py-6 md:px-4 flex flex-col md:flex-row gap-8 ">
          {/* Cart Items */}
          <div className="flex-shrink overflow-x-auto">
            <ShoppingCartLeft />
          </div>

          {/* Cart Totals */}
          <div className="flex-shrink-0">
            <ShoppingCartRightSection />
          </div>
        </div>
      ) : (
        <div className="flex flex-col  items-center justify-center py-16 text-center rounded-xl shadow-sm">
          <div className="bg-purple-100  p-6 rounded-full mb-4">
            <ShoppingCart size={40} className="text-purple-600" />
          </div>

          <SecondaryHeading>Your cart is empty</SecondaryHeading>
          <p className="text-secondary-foreground mb-6 max-w-sm">
            Looks like you haven&apos;t added anything to your cart yet. Explore our
            products and find something you&apos;ll love!
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href={"/shop"}>Start Shopping</Link>
          </Button>
        </div>
      )}
    </>
  );
}
