"use client";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { openSidebar } from "@/redux/slices/cartSidebarSlice";
import type { CartItem } from "@/types/cart";

interface AddToCartWrapperProps extends CartItem {
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
  const dispatch = useDispatch();

  const handleClick = () => {
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

    dispatch(openSidebar());
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default AddToCartWrapper;
