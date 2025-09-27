"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import CartItemCard from "../cart/CartItemCard";
import { ICartItem } from "@/types/cart";

export default function CalcCartItems() {
  const router = useRouter();

  // ✅ Get cart items from Redux
  const items = useAppSelector((state: RootState) => state.cart.items);

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item: ICartItem) => (
        <div
          key={item.productId}
          onClick={() => {
            router.push(`/shop/${item.slug}?color=${item.colorName}`);
          }}
          className="flex flex-col cursor-pointer items-center bg-secondary/30 rounded-md w-full"
        >
          <CartItemCard item={item} />
        </div>
      ))}
    </div>
  );
}
