"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import RippleEffect from "./RippleEffect";
import { Button } from "../ui/button";
import { IoMdCart } from "react-icons/io";

export type ImageCardProps = {
  id: string; // 👈  for product ID

  src: string; //image path
  title?: string;
  subTitle?: string;
  slug: string;
  price?: number;
  discount?: number;
  colorName?: string;
  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;

  aspectRatio?: "square" | "h-full";

  buttonText?: string; // 👈 customizable button text
  showAddToCart?: boolean; // 👈 new prop to control button visibility
  tags?: string[]; // 👈 new prop for the tag name

  changeColorOnHover?: boolean; // 👈 new prop for color change on hover

  showQuickView?: boolean; // 👈 new prop to control quick view button

  onQuickView?: (id: string, colorName: string) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({
  id,
  slug,
  src,
  title,
  price,
  discount = 0,
  subTitle,
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  aspectRatio = "square",
  showAddToCart = false,
  buttonText = "Show All",
  tags,

  colorName = "",
  changeColorOnHover = false,

  showQuickView = false,

  onQuickView,
}) => {
  return (
    <div
      className={`flex text-secondary-foreground  group ${changeColorOnHover ? "bg-secondary/30 md:hover:bg-secondary" : ""}   rounded-lg flex-col items-center h-full  relative `}
    >
      {/* image */}
      <div
        className={`relative w-full 
          bg-secondary ${rounded === "circle" ? "rounded-full" : "rounded-lg"} 
            ${aspectRatio == "square" ? "aspect-square" : "h-full rounded-none"}
            overflow-hidden flex items-center justify-center rounded-full group-hover:rounded-b-none`}
      >
        {/* just view in mobile devices */}
        <Link href={`/shop/${slug}`} className="md:hidden">
          <Image
            src={src}
            alt={title || "slide"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-cover object-top "
          />
        </Link>
        {/* Desktop image */}
        <Image
          src={src}
          alt={title || "slide"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover object-top md:block hidden transition-transform duration-500 group-hover:scale-125 "
        />

        {/* Hidden overlay with buttons */}
        <div className=" hidden md:flex absolute inset-0  bg-black/30 opacity-0 group-hover:opacity-100 items-end justify-center transition-opacity duration-300">
          {ripple && (
            <RippleEffect
              rippleColor={rippleColor}
              rippleOpacity={rippleOpacity}
              className="absolute inset-0 "
            />
          )}

          {/* add to cart button desktop*/}
          {showAddToCart && (
            <Button
              className="absolute left-[10%] top-[20%] size-8
            bg-secondary text-secondary-foreground shadow hover:bg-secondary/90
            "
              size="icon"
            >
              <IoMdCart />
            </Button>
          )}

          {/* showmore and quick view buttons desktop*/}
          <div className="flex absolute top-[70%] gap-2 ">
            <Button
              // className="bg-secondary text-secondary-foreground shadow hover:bg-secondary/90"
              variant="default"
              asChild
            >
              <Link href={slug ? slug : ""}>{buttonText}</Link>
            </Button>
            {showQuickView && (
              <>
                <Button
                  onClick={() => onQuickView?.(id, colorName)}
                  className="bg-secondary text-secondary-foreground shadow hover:bg-secondary/90"
                >
                  Quick View
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* add to cart button in mobile devices */}
      {(showAddToCart || showQuickView) && (
        <div className="flex gap-1 mt-2 md:hidden w-full">
          {showAddToCart && (
            <Button className=" flex gap-2 w-full justify-center items-center  text-sm ">
              <IoMdCart />
              Add to Cart
            </Button>
          )}
          {showQuickView && (
            <Button
              onClick={() => onQuickView?.(id, colorName)}
              className=" flex gap-2 w-full justify-center items-center text-sm "
            >
              Quick View
            </Button>
          )}
        </div>
      )}

      {/* Text content */}
      {title && (
        <div className="flex flex-1 flex-col gap-2 justify-between py-3 w-full">
          {/* Title & Subtitle */}
          {title && (
            <h3 className="text-center text-primary-foreground px-3 text-lg font-semibold ">
              {title}
            </h3>
          )}

          {subTitle && (
            <p className="text-sm leading-5 justify-self-start px-3 font-normal">
              {subTitle}
            </p>
          )}

          {/*  price and color */}
          <div className="flex items-center  justify-between px-4">
            {/* price and discount */}
            {price && (
              <div className="flex gap-1 items-center">
                <p className="text-center text-base font-semibold">
                  $
                  {(discount > 0
                    ? price - (price * discount) / 100
                    : price
                  ).toFixed(2)}
                </p>

                {discount > 0 && (
                  <span className="text-xs line-through text-muted-foreground">
                    ${price.toFixed(2)}
                  </span>
                )}
              </div>
            )}

            {/* color name */}
            {colorName && (
              <div className="flex items-center  text-sm gap-1">
                <span className="font-medium">Color: </span>
                <p className="font-semibold text-center">{colorName}</p>
              </div>
            )}
          </div>

          {/* tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 px-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-secondary group-hover:bg-primary/50 group-hover:text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
