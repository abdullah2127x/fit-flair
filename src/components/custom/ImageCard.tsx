"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RippleEffect from "./RippleEffect";
import { Button } from "../ui/button";
import { IoMdCart } from "react-icons/io";

type ImageCardProps = {
  id: string;
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
};

const ImageCard: React.FC<ImageCardProps> = ({
  id,
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
}) => {
  return (
    <div className="flex group flex-col items-center gap-1.5">
      <div
        className={`relative w-full aspect-square bg-gray-300 group ${
          rounded === "circle" ? "rounded-full" : "rounded-lg"
        } overflow-hidden flex items-center justify-center`}
      >
        {/* just view in mobile devices */}
        <Link href={"/ad"} className="md:hidden">
          <Image
            src={src}
            alt={title || "slide"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-cover object-top"
          />
        </Link>
        {/* Image */}
        <Image
          src={src}
          alt={title || "slide"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover object-top md:block  hidden"
        />

        {/* Hidden overlay with buttons */}
        <div
          className=" hidden md:flex absolute inset-0  bg-black/30 opacity-0 group-hover:opacity-100 
                        items-end justify-center transition-opacity duration-300"
        >
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

      {showAddToCart && (
        <Button className="md:hidden flex gap-2 w-full justify-center items-center mx-3 text-sm ">
          <IoMdCart />
          Add to Cart
        </Button>
      )}

      <div className="flex flex-col gap-">
        {/* Title & Subtitle */}
        {title && (
          <h3 className="text-center px-3 text-lg font-semibold ">{title}</h3>
        )}
        {subTitle && (
          <p className=" text-sm leading-5 justify-self-start px-3 font-normal">
            {subTitle}
          </p>
        )}
        <div className="flex items-center justify-between px-3">
          {price && (
            <p className="text-center text-base  justify-self-start px-3 font-medium">
              ${price}
            </p>
          )}
          {colorCode && colorName && (
            <div className="flex items-center gap-1 text-sm">
              {/* Circle */}
              <span
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{
                  backgroundColor: /^#([0-9A-F]{3}){1,2}$/i.test(colorCode)
                    ? colorCode // ✅ use hex if valid
                    : colorName, // ❌ fallback to CSS color name
                }}
              ></span>

              {/* Text */}
              <p className="font-medium text-center">
                {/^#([0-9A-F]{3}){1,2}$/i.test(colorCode)
                  ? colorCode
                  : colorName}
              </p>
            </div>
          )}

          {/* {tagName && (
            <p className="text-center text-base font-medium">
              {tagName}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
