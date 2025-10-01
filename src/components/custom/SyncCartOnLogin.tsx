"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";

import { setCart } from "@/redux/slices/cartSlice";
import { syncCart } from "@/utilityFunctions/cartFunctions";

export default function SyncCartOnLogin() {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    const runSync = async () => {
      const mergedCart = await syncCart();
      dispatch(setCart(mergedCart));
    };

    runSync();
  }, [user, dispatch]);

  return null; // no UI, just background logic
}
