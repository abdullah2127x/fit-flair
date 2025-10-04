"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { MdOutlineWatchLater } from "react-icons/md";
import { Button } from "@/components/ui/button";
import SecondaryHeading from "@/components/custom/SecondaryHeading";
import FullPageLoader from "@/components/custom/FullPageLoader";

function OrderCompletedContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount"); // ✅ get query param
  const router = useRouter();
  // useEffect(() => {
  //   if (!amount) return;
  //   const timer = setTimeout(() => {
  //     router.push("/shop");
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [amount, router]);

  return (
    <div
      id="orderCompleted"
      className="container mx-auto p-7 text-secondary-foreground flex flex-col items-center justify-center border-l border-b border-dotted py-20 relative"
    >
      <MdOutlineWatchLater className="size-16 absolute top-2 left-0 xl:-left-8 bg-secondary rounded-full" />
      {/* Main Content */}
      <div className="items-center flex flex-col gap-7">
        <Check className="bg-secondary size-20 p-1 rounded-full text-secondary-foreground" />
        <SecondaryHeading>Your Order Is Completed!</SecondaryHeading>
        <p className="max-w-[625px] text-center">
          Thank you for your order of ${amount ?? "0"}! Your order is being
          processed and will be completed within 3-6 hours. You will receive an
          email confirmation when your order is completed.
        </p>
        <Button size="lg" variant={"secondary"} asChild>
          <Link href="/shop"> Continue Shopping</Link>
        </Button>
      </div>
      {/* <Image
        className="absolute -bottom-6 right-0 xl:-right-10"
        src="/images/orderCompleted/checklist.png"
        width={70}
        height={70}
        alt="CheckList Icon"
      /> */}
    </div>
  );
}

export default function OrderCompleted() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      {/* <CreateOrderAfterPayment /> */}
      <OrderCompletedContent />
    </Suspense>
  );
}
