"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import apiClient from "@/lib/apiClient";
import { clearCart, selectCartSubtotal } from "@/redux/slices/cartSlice";
import FullPageLoader from "@/components/custom/FullPageLoader";
import { Button } from "@/components/ui/button";
import {
  resetShipping,
  selectShippingAddress,
  selectShippingCost,
} from "@/redux/slices/shippingSlice";
import { ICartItem } from "@/types/cart";
import Link from "next/link";
import {
  clearCartFromDB,
  syncCartForDelete,
} from "@/utilityFunctions/cartFunctions";
import { useUser } from "@clerk/nextjs";

function CreateOrderAfterPaymentContent() {
  // const [isClient, setIsClient] = useState(false)
  const { isLoaded } = useUser(); // track loading state
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isCreatingOrder, setIsCreatingOrder] = useState(true);
  const [statusText, setStatusText] = useState("Checking your payment...");
  const [error, setError] = useState<string | null>(null);

  const cartItems = useAppSelector((state) => state.cart.items);
  const subTotal = useAppSelector(selectCartSubtotal);
  const shippingAddress = useAppSelector(selectShippingAddress);
  const shippingCost = useAppSelector(selectShippingCost);
  const total: number = subTotal + shippingCost;

  // Get payment_intent and amount from URL
  const paymentIntentId = searchParams.get("payment_intent");
  const amount = searchParams.get("amount");

  const hasRun = useRef(false);

  useEffect(() => {
    async function createOrder() {
      // 🚫 Don't run if data isn't ready yet
      if (cartItems.length === 0) {
        setError("Cart is empty");
        setIsCreatingOrder(false);
        return;
      }

      if (!paymentIntentId) {
        setError("Missing payment information");
        setIsCreatingOrder(false);
        return;
      }

      if (!shippingAddress) {
        setError("Missing shipping address");
        setIsCreatingOrder(false);
        return;
      }

      setStatusText("Verifying payment...");

      try {
        setTimeout(() => {
          setStatusText("Creating your order...");
        }, 500);

        const orderData = {
          items: cartItems.map((item: ICartItem) => ({
            productId: item.productId,
            title: item.title,
            subTitle: item.title,
            slug: item.slug,
            colorName: item.colorName,
            imageSrc: item.imageSrc,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount,
          })),
          subTotal,
          shippingCost,
          total,
          paymentIntentId,
          shippingAddress,
          billingAddress: shippingAddress,
        };

        const createOrderRes = await apiClient.createOrder(orderData);
        if (createOrderRes.success) {
          // Clear from DB first
          await clearCartFromDB();

          // Then clear from Redux and localStorage
          dispatch(clearCart());

          // reset shipping
          dispatch(resetShipping());
          setStatusText("✅ Order created successfully! Redirecting...");

          setTimeout(() => {
            router.push(`/payment-success?amount=${amount || orderData.total}`);
          }, 500);
        } else {
          throw new Error(createOrderRes.message || "Order creation failed");
        }
      } catch (err) {
        console.error("Error creating order:", err);
        setError("Failed to create your order. Please contact support.");
      } finally {
        setIsCreatingOrder(false);
      }
    }
    // only run if the user is loaded
    if (isLoaded) {
      if (hasRun.current) return;
      hasRun.current = true;
      createOrder();
    }
    // }, [paymentIntentId, cartItems, subTotal, shippingAddress, shippingCost]);
  }, [
    isLoaded,
    amount,
    cartItems,
    dispatch,
    paymentIntentId,
    router,
    shippingAddress,
    shippingCost,
    subTotal,
    total,
  ]);
  // }, [isLoaded]);

  // http://localhost:3000/create-order?amount=77067.8&payment_intent=pi_3SEPF3JTGMgHbJqL0dHIKlHU&payment_intent_client_secret=pi_3SEPF3JTGMgHbJqL0dHIKlHU_secret_AyzVZJdJEyYz9jvWbAsHPnsJs&redirect_status=succeeded
  // === Conditional Rendering ===
  if (isCreatingOrder && !error && !isLoaded) {
    return <FullPageLoader message={statusText} />;
  }

  if (error) {
    return (
      <div className="container min-h-[70vh] mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p>{error}</p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/shopping-cart">Return to Cart</Link>
        </Button>
      </div>
    );
  }

  // When everything is successful but waiting to redirect
  return (
    <div className="container min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-green-600">{statusText}</h2>
      <p className="mt-2">Please wait while we redirect you...</p>
    </div>
  );
}

export default function CreateOrderAfterPayment() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      {/* <CreateOrderAfterPayment /> */}
      <CreateOrderAfterPaymentContent />
    </Suspense>
  );
}
