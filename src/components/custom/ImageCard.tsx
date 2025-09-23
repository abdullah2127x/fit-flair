"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoMdCart } from "react-icons/io";
import { Badge } from "../ui/badge";
import AddToCartWrapper from "./cart/AddToCartWrapper";
import {
  ImageCardCollection,
  ImageCardMinimal,
  ImageCardShowcase,
} from "@/types/imageCard";

export type ImageCardProps =
  | ImageCardMinimal
  | ImageCardCollection
  | ImageCardShowcase;

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const {
    id,
    slug,
    src,
    rounded = "circle",
    aspectRatio = "square",
    buttonText = "Show All",
    changeColorOnHover = false,
  } = props;

  // title exists in both collection and showcase
  const title =
    props.variant === "collection" || props.variant === "showcase"
      ? props.title
      : undefined;

  // destructure only for showcase
  const {
    subTitle,
    price,
    colorName,
    tags,
    discount = 0,
    showAddToCart,
    showQuickView,
    onQuickView,
  } = props.variant === "showcase" ? props : ({} as ImageCardShowcase);

  const productUrl = slug
    ? `/shop/${slug}${props.variant === "showcase" ? `?color=${colorName}` : ""}`
    : "/shop";

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
        <Link href={productUrl} className="md:hidden">
          <Image
            src={src}
            alt={title ?? "slide"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-cover object-top "
          />
        </Link>
        {/* Desktop image */}
        <Image
          src={src}
          alt={title ?? "slide"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover object-top md:block hidden transition-transform duration-500 group-hover:scale-125 "
        />

        {props.variant === "showcase" && discount > 0 && (
          <Badge variant="destructive" className="absolute left-3 top-3 z-10">
            -{discount}%
          </Badge>
        )}

        {/* Hidden overlay with buttons */}

        <div className=" hidden md:flex absolute inset-0  bg-black/30 opacity-0 group-hover:opacity-100 items-end justify-center transition-opacity duration-300">
          {/* add to cart button desktop*/}
          {props.variant == "showcase" && showAddToCart && (
            <AddToCartWrapper
              productId={id}
              slug={slug}
              title={props.variant === "showcase" ? props.title : ""}
              subTitle={subTitle}
              price={price}
              discount={discount}
              imageSrc={src}
              colorName={colorName}
            >
              <Button
                className="absolute left-[10%] top-[20%] size-8
            bg-secondary text-secondary-foreground shadow hover:bg-secondary/90
            "
                size="icon"
              >
                <IoMdCart />
              </Button>
            </AddToCartWrapper>
          )}

          {/* (showmore|Detial) and quick view buttons desktop*/}
          <div className="flex absolute top-[70%] gap-2 ">
            <Button
              // className="bg-secondary text-secondary-foreground shadow hover:bg-secondary/90"
              variant="default"
              asChild
            >
              <Link href={productUrl}>{buttonText}</Link>
            </Button>
            {props.variant == "showcase" && showQuickView && (
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

      {/* add to cart and quick view buttons in mobile devices */}
      {props.variant === "showcase" && (showAddToCart || showQuickView) && (
        <div className="flex gap-1 mt-2 md:hidden w-full">
          {showAddToCart && (
            <AddToCartWrapper
              productId={id}
              slug={slug}
              title={props.variant === "showcase" ? props.title : ""}
              subTitle={subTitle}
              price={price}
              discount={discount}
              imageSrc={src}
              colorName={colorName}
            >
              <Button
                variant={"secondary"}
                className=" flex gap-2 w-full justify-center items-center  text-sm "
              >
                <IoMdCart />
                Add to Cart
              </Button>
            </AddToCartWrapper>
          )}
          {showQuickView && (
            <Button
              variant={"secondary"}
              onClick={() => onQuickView?.(id, colorName)}
              className=" flex gap-2 w-full justify-center items-center text-sm "
            >
              Quick View
            </Button>
          )}
        </div>
      )}

      {/* Text content */}
      {props.variant !== "base" && title && (
        <div className="flex flex-1 flex-col gap-2 justify-between py-3 w-full">
          {/* Title & Subtitle */}
          <h3 className="text-center text-primary-foreground px-3 text-lg font-semibold ">
            {title}
          </h3>

          {props.variant === "showcase" && (
            <div className="flex flex-col w-full gap-2 justify-between">
              <p className="text-sm leading-5 justify-self-start px-3 font-normal">
                {subTitle}
              </p>

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
      )}
    </div>
  );
};
export default ImageCard;
