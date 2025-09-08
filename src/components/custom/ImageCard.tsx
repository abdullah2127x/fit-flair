"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RippleEffect from "./RippleEffect";
import { Button } from "../ui/button";
import { IoMdCart } from "react-icons/io";

export type ImageCardProps = {
  src: string; //image path
  title: string;
  href?: string;
  subTitle?: string;
  price?: number;
  discount?: number;
  colorCode?: string;
  colorName?: string;
  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;

  buttonText?: string; // 👈 customizable button text
  showAddToCart?: boolean; // 👈 new prop to control button visibility
  tags?: string[]; // 👈 new prop for the tag name

  changeColorOnHover?: boolean; // 👈 new prop for color change on hover
};

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  title,
  price,
  discount = 0,
  subTitle,
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  href,
  showAddToCart = false,
  buttonText = "Show All",
  tags,
  colorCode,
  colorName,
  changeColorOnHover = false,
}) => {
  return (
    <div
      className={`flex group ${changeColorOnHover ? "md:hover:bg-secondary" : ""}  rounded-lg  flex-col items-center h-full relative `}
    >
      {/* image */}
      <div
        className={`relative w-full aspect-square bg-secondary ${
          rounded === "circle" ? "rounded-full" : "rounded-lg "
        } overflow-hidden flex items-center justify-center group-hover:rounded-b-none`}
      >
        {/* just view in mobile devices */}
        <Link href={"/ad"} className="md:hidden">
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
          className="object-cover object-top md:block hidden transition-transform duration-500 group-hover:scale-110 "
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

          {showAddToCart && (
            <Button
              className="absolute left-[10%] top-[20%] size-8
            bg-white text-black shadow hover:bg-white/90
            "
              size="icon"
            >
              <IoMdCart />
            </Button>
          )}
          <Button
            className="absolute bottom-[10%]
              bg-white text-black shadow hover:bg-white/90
              "
            asChild
          >
            <Link href={href ? href : ""}>{buttonText}</Link>
          </Button>
        </div>
      </div>

      {/* add to cart button in mobile devices */}
      {showAddToCart && (
        <Button className="md:hidden flex gap-2 w-full justify-center items-center mx-3 text-sm ">
          <IoMdCart />
          Add to Cart
        </Button>
      )}

      {/* Text content */}
      <div className="flex flex-1 flex-col gap-2 justify-between py-3 w-full">
        {/* Title & Subtitle */}
        {title && (
          <h3 className="text-center px-3 text-lg font-semibold ">{title}</h3>
        )}
        {subTitle && (
          <p className=" text-sm leading-5 justify-self-start px-3 font-normal">
            {subTitle}
          </p>
        )}

        {/*  price and color */}
        <div className="flex items-center  justify-between px-2">
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
          {colorName && colorCode && (
            <div className="flex items-center text-sm gap-1">
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
                className="bg-secondary group-hover:bg-primary-foreground text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
