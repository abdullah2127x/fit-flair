// "use client";
// import React, { useState } from "react";
// import ImageCard from "./ImageCard";
// import QuickViewDialog from "@/components/custom/QuickViewDialog";
// import { ProductShowcaseSchema } from "@/types/product";
// import SkeletonImageCard from "@/components/custom/skeletons/SkeletonImageCard";

// type ProductGridProps = {
//   products: ProductShowcaseSchema[];
//   className?: string;
//   loading?: boolean; // 👈 initial load
//   loadingMore?: boolean; // 👈 load more
//   skeletonCount?: number; // 👈 optional skeleton count
// };

// const ProductGrid: React.FC<ProductGridProps> = ({
//   products,
//   className = "",
//   loading = false,
//   loadingMore = false,
//   skeletonCount = 5,
// }) => {
//   const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState<string | null>(
//     null
//   );
//   const [selectedColorName, setSelectedColorName] = useState<string | null>(
//     null
//   );

//   const handleQuickView = (id: string, colorName: string) => {
//     setSelectedColorName(colorName);
//     setSelectedProductId(id);
//     setIsQuickViewOpen(true);
//   };

//   return (
//     <div className={`w-full ${className}`}>
//       <div
//         className="grid gap-4 gap-y-8"
//         style={{
//           gridTemplateColumns: "repeat(auto-fit, minmax(288px, 1fr))",
//         }}
//       >
//         {loading
//           ? // ✅ Skeleton state
//             Array.from({ length: skeletonCount }).map((_, i) => (
//               <SkeletonImageCard key={i} tags={3} />
//             ))
//           : // ✅ Real products
//             products.map((product) => (
//               <ImageCard
//                 key={product.id}
//                 id={product.id.toString()}
//                 slug={product.slug}
//                 title={product.title}
//                 subTitle={product.subTitle}
//                 src={product.src}
//                 price={product.price}
//                 discount={product.discount}
//                 colorName={product.colorName}
//                 tags={product.tags}
//                 rounded="square"
//                 aspectRatio="square"
//                 buttonText="View Detail"
//                 showAddToCart={true}
//                 changeColorOnHover={true}
//                 showQuickView={true}
//                 onQuickView={handleQuickView}
//               />
//             ))}
//       </div>

//       {/* Shared Quick View dialog */}
//       {selectedProductId && selectedColorName && (
//         <QuickViewDialog
//           isOpen={isQuickViewOpen}
//           onOpenChange={(open) => {
//             setIsQuickViewOpen(open);
//             if (!open) {
//               setSelectedProductId(null);
//               setSelectedColorName(null);
//             }
//           }}
//           productId={selectedProductId}
//           colorName={selectedColorName}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductGrid;

"use client";
import React, { useState } from "react";
import ImageCard from "./ImageCard";
import QuickViewDialog from "@/components/custom/QuickViewDialog";
import { ProductShowcaseSchema } from "@/types/product";
import SkeletonImageCard from "@/components/custom/skeletons/SkeletonImageCard";

type ProductGridProps = {
  products: ProductShowcaseSchema[];
  className?: string;
  loading?: boolean; // 👈 initial load
  loadingMore?: boolean; // 👈 load more
  skeletonCount?: number; // 👈 number of skeletons
};

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className = "",
  loading = false,
  loadingMore = false,
  skeletonCount = 8,
}) => {
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
      <div
        className="grid gap-4 gap-y-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(288px, 1fr))",
        }}
      >
        {loading ? (
          // ✅ First load → only skeletons
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonImageCard key={i} tags={3} />
          ))
        ) : (
          <>
            {/* ✅ Render products */}
            {products.map((product,idx) => (
              <ImageCard
                key={idx}
                variant="showcase"
                id={product.id.toString()}
                slug={product.slug}
                title={product.title}
                subTitle={product.subTitle}
                src={product.src}
                price={product.price}
                discount={product.discount}
                colorName={product.colorName}
                tags={product.tags}
                rounded="square"
                aspectRatio="square"
                buttonText="View Detail"
                showAddToCart={true}
                changeColorOnHover={true}
                showQuickView={true}
                onQuickView={handleQuickView}
              />
            ))}

            {/* ✅ Append skeletons when loading more */}
            {loadingMore &&
              Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonImageCard key={`more-${i}`} tags={3} />
              ))}
          </>
        )}
      </div>

      {/* Shared Quick View dialog */}
      {selectedProductId && selectedColorName && (
        <QuickViewDialog
          isOpen={isQuickViewOpen}
          onOpenChange={(open) => {
            setIsQuickViewOpen(open);
            if (!open) {
              setSelectedProductId(null);
              setSelectedColorName(null);
            }
          }}
          productId={selectedProductId}
          colorName={selectedColorName}
        />
      )}
    </div>
  );
};

export default ProductGrid;
