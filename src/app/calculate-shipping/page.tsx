"use client";

import CalculateShippingLeftSection from "@/components/custom/calcShipping/CalculateShippingLeftSection";
import CalculateShippingRightSection from "@/components/custom/calcShipping/CalculateShippingRightSection";
import SecondaryHeading from "@/components/custom/SecondaryHeading";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectCartCount } from "@/redux/slices/cartSlice";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FullPageLoader from "@/components/custom/FullPageLoader";

function CalculateShippingContent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const searchParams = useSearchParams();

  const country = searchParams.get("country") ?? "";
  const city = searchParams.get("city") ?? "";
  const postalCode = searchParams.get("postalCode") ?? "";

  const cartCount = useAppSelector(selectCartCount);

  if (!isMounted) {
    return <FullPageLoader />;
  }

  return (
    <>
      {(cartCount as number) > 0 ? (
        <div className="container mx-auto  flex justify-center items-center">
          <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-y-6 md:gap-x-6">
            {/* Left Section */}
            <CalculateShippingLeftSection
              searchParams={{ country, city, postalCode }}
            />

            {/* Right Section */}
            <CalculateShippingRightSection />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl shadow-sm">
          <div className="bg-purple-100  p-6 rounded-full mb-4">
            <ShoppingCart size={40} className="text-purple-600" />
          </div>

          <SecondaryHeading>Your cart is empty</SecondaryHeading>
          <p className="text-secondary-foreground mb-6 max-w-sm">
            Looks like you haven&apos;t added anything to your cart yet. Explore
            our products and find something you&apos;ll love!
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href={"/shop"}>Start Shopping</Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default function CalculateShipping() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <CalculateShippingContent />
    </Suspense>
  );
}
