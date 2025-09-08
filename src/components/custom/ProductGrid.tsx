"use client";
import React from "react";
import ImageCard from "./ImageCard";

type SlideType = {
  id: number | string;
  src: string;
  title: string;
  subTitle?: string;
  discount?: number;
  price?: number;
  href?: string;
  showAddToCart?: boolean;
  buttonText?: string;
  colorCode?: string;
  colorName?: string;
  tags?: string[];
};

type ProductGridProps = {
  slides: SlideType[];
  slidesToShow?: number; // ✅ how many products per row
  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  className?: string;
  changeColorOnHover?: boolean; // 👈 new prop for color change on hover
};

const ProductGrid: React.FC<ProductGridProps> = ({
  slides,
  slidesToShow = 4, // default 4 per row
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  className = "",
  changeColorOnHover,
}) => {
  console.log("the slides are : ", slides);
  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap justify-center gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            // style={{
            //   flex: `0 0 calc(${100 / slidesToShow}% - 1rem)`, // 👈 controls width per row
            //   minWidth: "150px", // 👈 prevents items from shrinking too small
            // }}

            // className="w-full md:w-auto"
            // style={{
            //   flex: `0 0 calc(${100 / slidesToShow}% - 1rem)`,
            //   minWidth: "150px",
            // }}

            className={`
              flex-[0_0_calc(100%_-_1rem)] sm:flex-[0_0_calc(50%_-_1rem)] md:flex-[0_0_calc(33.333%_-_1rem)] lg:flex-[0_0_calc(25%_-_1rem)]
              min-w-[150px]
            `}
          >
            <ImageCard
              buttonText={slide.buttonText}
              showAddToCart={slide.showAddToCart}
              src={slide.src}
              price={slide.price}
              discount={slide.discount}
              title={slide.title}
              subTitle={slide.subTitle}
              rounded={rounded}
              ripple={ripple}
              rippleColor={rippleColor}
              rippleOpacity={rippleOpacity}
              href={slide.href}
              colorCode={slide.colorCode}
              colorName={slide.colorName}
              tags={slide.tags}
              changeColorOnHover={changeColorOnHover}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
