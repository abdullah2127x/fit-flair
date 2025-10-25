"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { usePathname } from "next/navigation";

import { setCart } from "@/redux/slices/cartSlice";
import { syncCart } from "@/utilityFunctions/cartFunctions";

export default function SyncCartOnLogin() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return;
    const excludedPaths = ["/about", "/services", "/contact"];// replace with the real paths later
    if (excludedPaths.includes(pathname)) {
      console.log("we are not syncing");
      return; // 🚫 skip sync on these pages
    }

    const runSync = async () => {
      console.log("syncing carts");
      const mergedCart = await syncCart();
      dispatch(setCart(mergedCart));
    };

    runSync();
  }, [user, dispatch, pathname]);

  return null; // no UI, just background logic
}