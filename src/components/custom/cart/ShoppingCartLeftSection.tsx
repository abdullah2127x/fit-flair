"use client";
import Image from "next/image";
import React from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ConfirmationAlertDialog from "@/components/custom/ConfirmationAlertDialog";
import {
  removeFromCart,
  setQuantity,
  clearCart,
  selectCartCount,
} from "@/redux/slices/cartSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RootState } from "@/redux/store";

const ShoppingCartLeftSection = () => {
  const dispatch = useAppDispatch();

  // ✅ Use Redux selectors
  const items = useAppSelector((state: RootState) => state.cart.items);
  const cartCount = useAppSelector(selectCartCount);

  const handleRemoveAllItems = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (productId: string, colorName: string) => {
    dispatch(removeFromCart({ productId, colorName }));
  };

  return (
    <div className="flex-grow">
      {/* ✅ Show counts */}
      <div className="flex justify-between mb-4 text-gray-700 text-sm">
        <p>
          Total items: <b>{cartCount}</b>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary-foreground text-secondary ">
            <tr className="">
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Total</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={`${item.productId}-${item.colorName}`}
                className="border-b text-secondary-foreground bg-secondary/30 "
              >
                <td className="p-4 flex items-center space-x-4">
                  <div className="h-24 w-24 overflow-hidden bg-lightPurple rounded-md aspect-square flex justify-center items-center ">
                    <Image
                      width={96}
                      height={96}
                      src={item.imageSrc}
                      alt={`${item.title} image`}
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="mr-12">
                    <h3 className="text-lg font-semibold text-nowrap">
                      {item.title}
                    </h3>
                    <h4 className="text-sm font-medium text-nowrap">
                      {item.subTitle}
                    </h4>
                    <p className="text-subText text-nowrap text-sm max-w-[200px] text-ellipsis overflow-hidden">
                      <span className="text-primary-foreground mr-1 font-semibold">
                        Color:
                      </span>
                      {item.colorName}
                    </p>
                  </div>
                </td>
                <td className="p-4 font-medium ">
                  ${Number(item.price - (item.price * item.discount) / 100).toFixed(2)}
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      dispatch(
                        setQuantity({
                          productId: item.productId,
                          colorName: item.colorName,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    className="border border-secondary-foreground text-secondary-foreground rounded w-16 text-center"
                  />
                </td>
                <td className="p-4 font-semibold">
                  {(
                    (item.price - (item.price * item.discount) / 100) *
                    (item.quantity ?? 1)
                  ).toFixed(2)}
                </td>
                <td>
                  <ConfirmationAlertDialog
                    title="Remove Item?"
                    description="This item will be removed from your cart."
                    triggerLabel={<MdDeleteSweep size={24} />}
                    variant="ghost"
                    confirmLabel="Remove"
                    onConfirm={() =>
                      handleRemoveItem(item.productId, item.colorName)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 flex-col md:flex-row justify-between mt-4 ">
        <Button
          className="w-full md:w-auto"
          variant={"secondary"}
          size={"lg"}
          asChild
        >
          <Link href="/shop">Update Cart</Link>
        </Button>

        {cartCount > 0 && (
          <ConfirmationAlertDialog
            title="Clear Cart?"
            description="This will remove all items from your cart. Are you sure?"
            triggerLabel="Clear Cart"
            variant="destructive"
            confirmLabel="Clear"
            cancelLabel="Cancel"
            onConfirm={handleRemoveAllItems}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingCartLeftSection;
