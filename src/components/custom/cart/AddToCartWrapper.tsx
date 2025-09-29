"use client";

import { ReactNode, useState } from "react";
import { addToCart, persistCartToDB } from "@/redux/slices/cartSlice";
import { openSidebar } from "@/redux/slices/cartSidebarSlice";
import { useUser } from "@clerk/nextjs";
import type { ICartItem } from "@/types/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

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
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const cartLoading = useAppSelector((state: RootState) => state.cart.loading);
  const cartError = useAppSelector((state: RootState) => state.cart.error);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Update Redux (local)
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

      // 2. Open sidebar
      dispatch(openSidebar());

      // 3. If logged in → persist entire cart
      if (user) {
        console.log("🛒 Syncing full cart with backend...");
        // Get the updated cart items after the addToCart action
        const updatedCartItems = [...cartItems, {
          productId,
          slug,
          title,
          subTitle,
          price,
          discount,
          imageSrc,
          colorName,
          quantity,
        }];
        await dispatch(persistCartToDB(updatedCartItems)).unwrap();
        console.log("✅ Cart synced successfully.");
      } else {
        console.log("⚠️ Guest: cart saved only in Redux/localStorage.");
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
