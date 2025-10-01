"use client";

import { ReactNode, useState } from "react";
import { addToCart } from "@/redux/slices/cartSlice";
import { openSidebar } from "@/redux/slices/cartSidebarSlice";
import { useUser } from "@clerk/nextjs";
import type { ICartItem } from "@/types/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { syncCart } from "@/utilityFunctions/cartFunctions";

interface AddToCartWrapperProps extends ICartItem {
  children: ReactNode;
}

const AddToCartWrapper = ({
  children,
  productId,
  slug,
  title,
  subTitle,
  price,
  discount,
  imageSrc,
  colorName,
  quantity = 1,
}: AddToCartWrapperProps) => {
  const dispatch = useAppDispatch();
  const { user } = useUser();  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Update Redux immediately
      dispatch(
        addToCart({
          productId,
          slug,
          title,
          subTitle,
          price,
          discount,
          imageSrc,
          colorName,
          quantity,
        })
      );

      // 2️⃣ Open sidebar
      dispatch(openSidebar());

      // 3️⃣ If logged in → sync merged cart with backend
      if (user) {
        setTimeout(async () => {
          console.log("🛒 Syncing cart with backend...");
          await syncCart(); // handles merge + persist
        }, 2000);
      }
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      {children}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default AddToCartWrapper;
