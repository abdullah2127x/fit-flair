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

  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;

  buttonText?: string; // 👈 customizable button text
  showAddToCart?: boolean; // 👈 new prop to control bucarttton visibility
};

const ImageCard: React.FC<ImageCardProps> = ({
  id,
  src,
  title,
  price,
  subTitle,
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  href,
  showAddToCart = true,
  buttonText = "Show All",
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
          className="object-cover object-top md:block hidden"
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
        {price && (
          <p className="text-center text-base  justify-self-start px-3 font-medium">
            ${price}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;

// ===========================================
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ShoppingCart, Tag, Palette } from "lucide-react";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { useCart } from "@/contexts/CartContext";
// import { Product, ProductVariant } from "@/lib/types";

// interface ImageCardProps {
//   product: Product;
//   ripple?: boolean;
//   rippleColor?: string;
//   rippleOpacity?: number;
// }

// const ImageCard: React.FC<ImageCardProps> = ({
//   product,
//   ripple = false,
//   rippleColor = "white",
//   rippleOpacity = 0.3,
// }) => {
//   const { addToCart } = useCart();
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
//     product.variants[0]
//   );

//   const discountedPrice = product.discount
//     ? product.price * (1 - product.discount / 100)
//     : product.price;

//   const hasStock = selectedVariant.stock > 0;

//   const handleQuickAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart(product, selectedVariant);
//   };

//   return (
//     <div className="flex group flex-col items-center">
//       {/* Image section */}
//       <div className="relative w-full aspect-square overflow-hidden rounded-lg">
//         <Image
//           src={selectedVariant.featuredImage}
//           alt={product.title}
//           fill
//           className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
//         />

//         {/* Discount Badge */}
//         {product.discount && (
//           <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
//             -{product.discount}%
//           </Badge>
//         )}

//         {/* Stock Badge */}
//         {!hasStock && (
//           <Badge variant="secondary" className="absolute top-2 right-2">
//             Out of Stock
//           </Badge>
//         )}

//         {/* Overlay on hover (desktop) */}
//         <div className="hidden md:flex absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100
//             transition-opacity duration-300 items-center justify-center">
//           <Button
//             onClick={handleQuickAdd}
//             disabled={!hasStock}
//             className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
//           >
//             <ShoppingCart className="h-4 w-4 mr-2" />
//             Add to Cart
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Add to Cart */}
//       <Button
//         className="md:hidden flex gap-2 w-full justify-center items-center mx-3 text-sm mt-2"
//         onClick={handleQuickAdd}
//         disabled={!hasStock}
//       >
//         <ShoppingCart className="h-4 w-4" />
//         Add to Cart
//       </Button>

//       {/* Details */}
//       <div className="flex flex-col w-full p-3">
//         {/* Title */}
//         <Link href={`/products/${product.slug}`}>
//           <h3 className="text-center text-lg font-semibold group-hover:text-primary transition-colors">
//             {product.title}
//           </h3>
//         </Link>

//         {/* Variants (colors) */}
//         <div className="flex items-center justify-center gap-1 mt-2">
//           <Palette className="h-3 w-3 text-muted-foreground" />
//           <div className="flex gap-1">
//             {product.variants.map((variant) => (
//               <button
//                 key={variant.colorName}
//                 onClick={() => setSelectedVariant(variant)}
//                 className={`w-4 h-4 rounded-full border-2 ${
//                   selectedVariant.colorName === variant.colorName
//                     ? "border-primary"
//                     : "border-gray-300"
//                 }`}
//                 style={{ backgroundColor: variant.colorCode }}
//                 title={variant.colorName}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Price */}
//         <div className="flex justify-center items-center gap-2 mt-2">
//           <span className="font-bold text-lg">
//             ${discountedPrice.toFixed(2)}
//           </span>
//           {product.discount && (
//             <span className="text-sm text-muted-foreground line-through">
//               ${product.price.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Stock info */}
//         <div className="flex justify-center items-center gap-1 mt-1 text-xs text-muted-foreground">
//           <Tag className="h-3 w-3" />
//           <span>{selectedVariant.stock} left</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageCard;
