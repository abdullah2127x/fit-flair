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
import { quickViewProductQuery } from "@/lib/GroqQueries";
import { QuickViewProductSchema } from "@/types/product";

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
  console.log("the quick view open and re rendered ");
  const [productsCache, setProductsCache] = useState<
    Record<string, QuickViewProductSchema>
  >({});
  const [product, setProduct] = useState<QuickViewProductSchema | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetailQuery = quickViewProductQuery({
      productId,
      colorName,
    });

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
        const data = await client.fetch(fetchProductDetailQuery);
        if (data) {
          const newProduct: QuickViewProductSchema = {
            //  slug, subTitle, fabric, discount,
            id: data.id,
            slug: data.slug,
            title: data.title,
            subTitle: data.subTitle,
            price: data.price,
            discount: data.discount,
            description: data.description,
            fabric: data.fabric,
            category: data.category,
            subCategory: data.subCategory || "",
            audience: data.audience,
            season: data.season || "",
            designs: data.designs || [],
            occasions: data.occasions || [],
            variant: data.variant,
            outFitType: data.outFitType || [],
            uploadedAt: data.uploadedAt,
          };
          console.log("fetched product:", newProduct);
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
  }, [productId, productsCache, colorName]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg z-50">
        {product ? (
          <>
            <DialogHeader>
              <DialogTitle>{product.title}</DialogTitle>
              <DialogDescription>
                Take a closer look at this product before buying.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col md:flex-row gap-6">
              <Image
                // src={product.variant.additionalImages[2]}
                src={product.variant.featuredImage}
                alt={product.title}
                width={250}
                height={250}
                className="rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <p className="text-secondary-foreground">{product.description}</p>
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
