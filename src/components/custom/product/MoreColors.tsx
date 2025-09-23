import { Badge } from "@/components/ui/badge";
import {
  ProductDetailSchema,
  ProductVariantSchema,
  QuickViewProductSchema,
} from "@/types/product";
import Image from "next/image";
import React from "react";
import SecondaryHeading from "../SecondaryHeading";


const MoreColors = ({
  product,
  initialProduct,
}: {
  product: ProductDetailSchema;
  initialProduct: QuickViewProductSchema;
}) => {
  // Variant change handler
  const handleVariantChange = (variant: ProductVariantSchema) => {
    const url = new URL(window.location.href);
    console.log("the window url is ", url);
    url.searchParams.set("color", variant.colorName);
    window.history.pushState({}, "", url.toString());
    console.log("the window url is ", url);
  };

  return (
    <div className="">
      <SecondaryHeading className="text-center">
        Explore More Colors
      </SecondaryHeading>
     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {product.variants
          .filter(
            (variant) => initialProduct.variant.colorName !== variant.colorName
          )
          .map((variant, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleVariantChange(variant)}
            >
              <div className="aspect-square relative">
                <Image
                  src={variant.featuredImage}
                  alt={`${product.title} - ${variant.colorName}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Color Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-white"
                      style={{ backgroundColor: variant.colorCode }}
                    />
                    <span className="text-white text-sm font-medium">
                      {variant.colorName}
                    </span>
                  </div>
                  <div className="mt-1">
                    <Badge
                      variant={variant.stock > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {variant.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoreColors;
