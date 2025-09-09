"use client";
import React, { useState } from "react";
import ImageCard from "./ImageCard";
import QuickViewDialog from "@/components/custom/QuickViewDialog";
import { ProductShowcaseSchema } from "@/schemas/product";

// type SlideType = {
//   id: number | string;
//   src: string;
//   title: string;
//   subTitle?: string;
//   discount?: number;
//   price?: number;
//   href?: string;
//   showAddToCart?: boolean;

//   colorName?: string;
//   tags?: string[];
// };

type ProductGridProps = {
  products: ProductShowcaseSchema[];
  productsToShow?: number; // ✅ how many products per row
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  className?: string;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  productsToShow = 4, // default 4 per row

  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  className = "",
}) => {
  // To manage Quick View dialog state for specific product by id
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null
  );

  const handleQuickView = (id: string, colorName: string) => {
    setSelectedColorName(colorName);
    setSelectedProductId(id);
    setIsQuickViewOpen(true);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap justify-center gap-y-10 gap-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            // style={{
            //   flex: `0 0 calc(${100 / productsToShow}% - 1rem)`, // 👈 controls width per row
            //   minWidth: "150px", // 👈 prevents items from shrinking too small
            // }}

            // className="w-full md:w-auto"
            // style={{
            //   flex: `0 0 calc(${100 / productsToShow}% - 1rem)`,
            //   minWidth: "150px",
            // }}

            className={`
              flex-[0_0_calc(100%_-_1rem)] sm:flex-[0_0_calc(50%_-_1rem)] md:flex-[0_0_calc(33.333%_-_1rem)] lg:flex-[0_0_calc(25%_-_1rem)]
              min-w-[150px] bg-secondary/30 rounded-lg
            `}
          >
            <ImageCard
              id={product.id.toString()}
              slug={product.slug}
              title={product.title}
              subTitle={product.subTitle}
              src={product.src}
              price={product.price}
              discount={product.discount}
              colorName={product.colorName}
              tags={product.tags}
              ripple={ripple}
              rippleColor={rippleColor}
              rippleOpacity={rippleOpacity}
              rounded="square"
              aspectRatio="square"
              buttonText="View Detail"
              showAddToCart={true}
              changeColorOnHover={true}
              showQuickView={true} // 👈 enable quick view button
              onQuickView={handleQuickView} // 👈 pass down
            />
          </div>
        ))}
      </div>

      {/* Only one QuickViewDialog shared for all products */}
      {selectedProductId && selectedColorName && (
        <QuickViewDialog
          isOpen={isQuickViewOpen}
          onOpenChange={setIsQuickViewOpen}
          productId={selectedProductId}
          colorName={selectedColorName}
        />
      )}
    </div>
  );
};

export default ProductGrid;
