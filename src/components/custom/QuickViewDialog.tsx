// // LMArena first responce
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { client } from "@/sanity/lib/client";
// import { ProductSkeleton } from "./product/ProductSkeleton";
// import { quickViewProductQuery } from "@/lib/GroqQueries";
// import { QuickViewProductSchema } from "@/types/product";
// import { ShoppingCart, WalletCards, ZoomIn } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface QuickViewDialogProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   productId: string;
//   colorName: string;
// }

// export default function QuickViewDialog({
//   isOpen,
//   onOpenChange,
//   productId,
//   colorName,
// }: QuickViewDialogProps) {
//   const [productsCache, setProductsCache] = useState<
//     Record<string, QuickViewProductSchema>
//   >({});
//   const [product, setProduct] = useState<QuickViewProductSchema | null>(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isZooming, setIsZooming] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

//   useEffect(() => {
//     if (!productId) return;

//     const fetchProductDetailQuery = quickViewProductQuery({
//       productId,
//       colorName,
//     });

//     if (productsCache[productId]) {
//       setProduct(productsCache[productId]);
//       return;
//     }

//     setProduct(null);
//     const fetchData = async () => {
//       try {
//         const data = await client.fetch(fetchProductDetailQuery);
//         if (data) {
//           const newProduct: QuickViewProductSchema = {
//             id: data.id,
//             slug: data.slug,
//             title: data.title,
//             subTitle: data.subTitle,
//             price: data.price,
//             discount: data.discount,
//             description: data.description,
//             fabric: data.fabric,
//             category: data.category,
//             subCategory: data.subCategory || "",
//             audience: data.audience,
//             season: data.season || "",
//             designs: data.designs || [],
//             occasions: data.occasions || [],
//             variant: data.variant,
//             outFitType: data.outFitType || "",
//             uploadedAt: data.uploadedAt,
//           };

//           setProductsCache((prev) => ({ ...prev, [productId]: newProduct }));
//           setProduct(newProduct);
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchData();
//   }, [productId, productsCache, colorName]);

//   const allImages = product
//     ? [product.variant.featuredImage, ...product.variant.additionalImages]
//     : [];

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setBackgroundPosition(`${x}% ${y}%`);
//     setZoomPosition({
//       x: e.clientX - left - 40,
//       y: e.clientY - top - 40,
//     });
//   };

//   const discountedPrice = product
//     ? product.price - (product.price * product.discount) / 100
//     : 0;

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-6xl w-[95vw] p-0 gap-0 max-h-[90vh] overflow-auto">
//         {product ? (
//           <div className="flex flex-col lg:flex-row h-full">
//             {/* Image Section */}
//             <div className="lg:w-1/2 p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
//               <div className="space-y-4">
//                 {/* Main Image with Zoom */}
//                 <div
//                   className="relative aspect-square overflow-hidden rounded-lg bg-white dark:bg-gray-800 cursor-zoom-in"
//                   onMouseEnter={() => setIsZooming(true)}
//                   onMouseLeave={() => setIsZooming(false)}
//                   onMouseMove={handleMouseMove}
//                 >
//                   <Image
//                     src={allImages[selectedImage]}
//                     alt={product.title}
//                     fill
//                     className="object-contain"
//                     priority
//                   />

//                   {/* Zoom Icon */}
//                   {isZooming && (
//                     <div
//                       className="absolute pointer-events-none z-10 w-20 h-20 border-2 border-primary rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
//                       style={{
//                         left: `${zoomPosition.x}px`,
//                         top: `${zoomPosition.y}px`,
//                       }}
//                     >
//                       <ZoomIn className="w-6 h-6 text-primary" />
//                     </div>
//                   )}

//                   {/* Zoomed Background */}
//                   {isZooming && (
//                     <div
//                       className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
//                       style={{
//                         backgroundImage: `url(${allImages[selectedImage]})`,
//                         backgroundPosition: backgroundPosition,
//                         backgroundSize: "250%",
//                         backgroundRepeat: "no-repeat",
//                       }}
//                     />
//                   )}
//                 </div>

//                 {/* Thumbnail Images */}
//                 {allImages.length > 1 && (
//                   <div className="flex gap-2 overflow-x-auto pb-2">
//                     {allImages.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedImage(index)}
//                         className={cn(
//                           "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all",
//                           selectedImage === index
//                             ? "border-primary ring-2 ring-primary/20"
//                             : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
//                         )}
//                       >
//                         <Image
//                           src={image}
//                           alt={`${product.title} ${index + 1}`}
//                           fill
//                           className="object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="lg:w-1/2 p-4 lg:p-6 overflow-y-auto ">
//               <DialogHeader className="space-y-1">
//                 <DialogTitle className="text-2xl lg:text-3xl font-bold">
//                   {product.title}
//                 </DialogTitle>
//                 {product.subTitle && (
//                   <DialogDescription className="text-base lg:text-lg">
//                     {product.subTitle}
//                   </DialogDescription>
//                 )}
//               </DialogHeader>

//               <div className="mt-6 space-y-6">
//                 {/* Price Section */}
//                 <div className="flex items-baseline gap-3">
//                   {product.discount > 0 ? (
//                     <>
//                       <span className="text-3xl font-bold text-primary-foreground">
//                         ${discountedPrice.toFixed(2)}
//                       </span>
//                       <span className="text-xl text-muted-foreground line-through">
//                         ${product.price.toFixed(2)}
//                       </span>
//                       <Badge variant="destructive">
//                         {product.discount}% OFF
//                       </Badge>
//                     </>
//                   ) : (
//                     <span className="text-3xl font-bold text-primary">
//                       ${product.price.toFixed(2)}
//                     </span>
//                   )}
//                 </div>


                // {/* Color Info */}
                // <div className="flex items-center gap-3">
                //   <span className="text-sm font-medium">Color:</span>
                //   <div className="flex items-center gap-2">
                //     <div
                //       className="w-6 h-6 rounded-full border border-gray-300"
                //       style={{ backgroundColor: product.variant.colorCode }}
                //     />
                //     <span className="text-sm">{product.variant.colorName}</span>
                //   </div>
                // </div>
//                 {/* Stock Status */}
//                 <div className="flex items-center gap-2">
//                   <Badge
//                     variant={
//                       product.variant.stock > 0 ? "secondary" : "destructive"
//                     }
//                   >
//                     {product.variant.stock > 0
//                       ? `In Stock (${product.variant.stock})`
//                       : "Out of Stock"}
//                   </Badge>
//                 </div>
//                 {/* Product Details */}
//                 <div className="space-y-3">
//                   {product.fabric && (
//                     <div className="flex gap-2">
//                       <span className="text-sm font-medium">Fabric:</span>
//                       <span className="text-sm text-muted-foreground">
//                         {product.fabric}
//                       </span>
//                     </div>
//                   )}
//                   {product.category && (
//                     <div className="flex gap-2">
//                       <span className="text-sm font-medium">Category:</span>
//                       <span className="text-sm text-muted-foreground">
//                         {product.category}
//                         {product.subCategory && ` / ${product.subCategory}`}
//                       </span>
//                     </div>
//                   )}

//                   {product.season && (
//                     <div className="flex gap-2">
//                       <span className="text-sm font-medium">Season:</span>
//                       <span className="text-sm text-muted-foreground">
//                         {product.season}
//                       </span>
//                     </div>
//                   )}
//                   {product.audience && (
//                     <div className="flex gap-2">
//                       <span className="text-sm font-medium">Audience:</span>
//                       <span className="text-sm text-muted-foreground">
//                         {product.audience}
//                       </span>
//                     </div>
//                   )}
//                 </div>
                // {/* Tags */}
                // {((product.occasions ?? []).length > 0 ||
                //   (product.designs ?? []).length > 0 ||
                //   product.outFitType) && (
                //   <div className="flex flex-wrap gap-2">
                //     {product.occasions?.map((occasion) => (
                //       <Badge key={occasion} variant="secondary">
                //         {occasion}
                //       </Badge>
                //     ))}
                //     {product.designs?.map((design) => (
                //       <Badge key={design} variant="outline">
                //         {design}
                //       </Badge>
                //     ))}
                //     {product.outFitType && (
                //       <Badge variant="outline">{product.outFitType}</Badge>
                //     )}
                //   </div>
                // )}
//                 {/* Description */}
//                 {product.description && (
//                   <div className="space-y-2">
//                     <h4 className="font-medium">Description</h4>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {product.description}
//                     </p>
//                   </div>
//                 )}
//                 {/* Action Button */}
//                 <div className="flex gap-4 items-center">
//                   <Button
//                     variant="secondary"
//                     className="w-full lg:w-auto"
//                     size="lg"
//                     disabled={product.variant.stock === 0}
//                   >
//                     <ShoppingCart className="mr-2 h-5 w-5" />
//                     Add to Cart
//                   </Button>
//                   <Button
//                     variant="secondary"
//                     className="w-full lg:w-auto"
//                     size="lg"
//                     disabled={product.variant.stock === 0}
//                   >
//                     <WalletCards className="mr-2 h-5 w-5" />
//                     Buy Now
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="p-6">
//             <ProductSkeleton />
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { client } from "@/sanity/lib/client";
// import { quickViewProductQuery } from "@/lib/groqQueries";
import { quickViewProductQuery } from "@/lib/groqQueries";

import { QuickViewProductSchema } from "@/types/product";
import ProductDetailContent from "@/components/custom/product/productDetailContent";

interface QuickViewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  colorName: string;
}

export default function QuickViewDialog({
  isOpen,
  onOpenChange,
  productId,
  colorName,
}: QuickViewDialogProps) {
  const [product, setProduct] = useState<QuickViewProductSchema | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetailQuery = quickViewProductQuery({
      productId,
      colorName,
    });

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(fetchProductDetailQuery);
        if (data) setProduct(data as QuickViewProductSchema);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, colorName]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] p-0 gap-0 max-h-[90vh] overflow-auto">
        <ProductDetailContent product={product} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
