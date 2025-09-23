import { CartItem } from "@/types/cart";
import Image from "next/image";
import React from "react";

const CartItemCard = ({ item }: { item: CartItem }) => {
  return (
    <div className="w-full flex justify-start items-center p-2">
      <div className="h-20 md:h-24 w-20 md:w-24 overflow-hidden bg-secondary rounded-md aspect-square flex justify-center items-center">
        <Image
          src={item.imageSrc || "/placeholder.jpg"}
          width={96}
          height={96}
          alt={item.title || "Product Image"}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col  justify-center text-start ml-3 max-w-[70%] w-full">
        <h4 className="md:text-lg font-semibold line-clamp-1 ">{item.title}</h4>
        {/* <h5 className="text-sm leading-3 text-secondary-foreground font-semibold  ">
          {item.subTitle}
        </h5> */}
        <div className="flex items-center justify-between pr-8 w-full ">
          <p className="text-sm text-secondary-foreground">
            <span className="text-primary-foreground font-medium mr-1">
              Color:
            </span>
            {item.colorName}
          </p>
          <p className="text-sm text-secondary-foreground">
            <span className="text-primary-foreground font-medium mr-1">
              Qty:
            </span>
            {item.quantity}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {/* ✅ Price after discount */}
          <p className="text-sm font-bold text-secondary-foreground">
            ${item.price - (item.price * item.discount) / 100}
          </p>

          {/* ❌ Original Price */}
          <p className="text-sm line-through text-muted-foreground">
            ${item.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
