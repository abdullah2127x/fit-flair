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
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { client } from "@/sanity/lib/client";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
// };

// export default function QuickViewDialog({isOpen, productId }: {isOpen:boolean, productId: string }) {
//   const [product, setProduct] = useState<Product | null>(null);

//   const productDetailQuery = `*[
//   _type == "product" &&
//   _id == ${productId} &&
//   defined(title) &&
//   defined(slug.current) &&
//   defined(description) &&
//   defined(price) &&
//   defined(variants)
// ] [0]
//   {
//   "id": _id,
//   title,
//   subTitle,
//   "slug": slug.current,
//   price,
//   "category": category,
//   season,
//   "subCategory": subCategory,
//   "fabric": fabric->name,
//   "audience": audience,
//   variants[] {
//     stock,
//     "featuredImage": featuredImage.asset->url,
//     "additionalImages": additionalImages[].asset->url,
//     "colorName": color->name,
//     "colorCode": color->code
//   },
//   "description": pt::text(description),
//   "uploadedAt": _createdAt,
//   isFeatured,
//   isNewArrival,
//   relevantTags,
//   "outFitType": select(
//     audience == "men" => menOutfitType,
//     audience == "women" => menOutfitType,
//     []
//   ),
//   discount
// }`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("the product is ", productId);
//         if (!productId) return;

//         const data = await client.fetch(productDetailQuery);
//         console.log("the fetched data is ", data);
//         const formatted = data.map((item: any) => {
//           const customTags = [
//             item.audience || "",
//             item.fabric || "",
//             ...(item.season || []),
//             item.outFitType || "",
//             item.category || "",
//             item.subCategory || "",
//           ].filter(Boolean);

//           return {
//             id: item.id,
//             title: item.title,
//             subTitle: item.subTitle,
//             price: item.price,
//             src: item.variants?.[0]?.featuredImage || "/fallback.jpg",
//             colorCode: item.variants?.[0]?.colorCode || "",
//             colorName: item.variants?.[0]?.colorName || "",
//             tags: customTags,
//             href: `/products/${item.slug}`,
//             showAddToCart: true,
//             buttonText: "View Detail",
//             discount: item.discount || 0,
//           };
//         });

//         setProduct(formatted);
//       } catch (error) {
//         console.error(`Error fetching products for ${productId}:`, error);
//       }
//     };

//     fetchData();
//   }, [productId]);

//   return (
//     <Dialog>
//       <DialogTrigger isOpen={isOpen} asChild>
//         {/* <Button className="bg-secondary text-secondary-foreground shadow hover:bg-secondary/90">
//           Quick View
//         </Button> */}
//       </DialogTrigger>

//       <DialogContent  className="sm:max-w-lg">
//         {product ? (
//           <>
//             <DialogHeader>
//               <DialogTitle>{product.name}</DialogTitle>
//               <DialogDescription>
//                 Take a closer look at this product before buying.
//               </DialogDescription>
//             </DialogHeader>

//             <div className="flex flex-col md:flex-row gap-6">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={250}
//                 height={250}
//                 className="rounded-lg"
//               />
//               <div className="flex flex-col justify-between">
//                 <p className="text-gray-600">{product.description}</p>
//                 <p className="mt-2 text-lg font-semibold">
//                   ${product.price.toFixed(2)}
//                 </p>
//                 <Button className="mt-4">Add to Cart</Button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-500">Loading...</p>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { client } from "@/sanity/lib/client";
import { ProductSkeleton } from "./ProductSkeleton";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function QuickViewDialog({
  isOpen,
  onOpenChange,
  productId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
}) {
  console.log("the quick view open and re rendered ");
  const [productsCache, setProductsCache] = useState<Record<string, Product>>(
    {}
  );
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return;

    const productDetailQuery = `*[ _type == "product" && _id == "${productId}" ][0]{
    "id": _id,
    title,
    price,
    "description": pt::text(description),
    "image": variants[0].featuredImage.asset->url
  }`;

    // 1. Check cache first
    if (productsCache[productId]) {
      setProduct(productsCache[productId]);
      return; // ✅ stop here, no fetch needed
    }

    // 2. If not in cache → fetch it
    setProduct(null); // clear old product immediately
    const fetchData = async () => {
      try {
        console.log("fetching product for id:", productId);
        const data = await client.fetch(productDetailQuery);
        if (data) {
          const newProduct: Product = {
            id: data.id,
            name: data.title,
            price: data.price,
            description: data.description,
            image: data.image || "/fallback.jpg",
          };

          // Save to cache
          setProductsCache((prev) => ({ ...prev, [productId]: newProduct }));

          // Set as current product
          setProduct(newProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [productId, productsCache]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg z-50">
        {product ? (
          <>
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>
                Take a closer look at this product before buying.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={product.image}
                alt={product.name}
                width={250}
                height={250}
                className="rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2 text-lg font-semibold">
                  ${product.price.toFixed(2)}
                </p>
                <Button className="mt-4">Add to Cart</Button>
              </div>
            </div>
          </>
        ) : (
          <ProductSkeleton />
        )}
      </DialogContent>
    </Dialog>
  );
}
