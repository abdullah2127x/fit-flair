"use client";
import React from "react";
import ImageCard from "./ImageCard";

type SlideType = {
  src: string;
  title?: string;
  subTitle?: string;
  href?: string;
  linkEnabled?: boolean;
};

type ProductGridProps = {
  slides: SlideType[];
  slidesToShow?: number; // ✅ how many products per row
  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  className?: string;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  slides,
  slidesToShow = 4, // default 4 per row
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap justify-center gap-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              flex: `0 0 calc(${100 / slidesToShow}% - 1rem)`, // 👈 controls width per row
              minWidth: "150px", // 👈 prevents items from shrinking too small
            }}
          >
            <ImageCard
              src={slide.src}
              title={slide.title}
              subTitle={slide.subTitle}

              rounded={rounded}
              ripple={ripple}
              rippleColor={rippleColor}
              rippleOpacity={rippleOpacity}
              href={slide.href}
              linkEnabled={slide.linkEnabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
