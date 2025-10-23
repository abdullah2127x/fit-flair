
// app/shop/[slug]/page.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { productDetailQuery } from "@/lib/groqQueries";
import {
  ProductDetailSchema,
  ProductVariantSchema,
  QuickViewProductSchema,
} from "@/types/product";
import ProductDetailContentSkeleton from "@/components/custom/skeletons/ProductDetailContentSkeleton";
import ProductDetailContent from "@/components/custom/product/productDetailContent";
import MoreColors from "@/components/custom/product/MoreColors";
import RelevantProducts from "@/components/custom/product/RelevantProducts";
import FullPageLoader from "@/components/custom/FullPageLoader";

// 👇 Client-side content logic
export default function ProductDetailPageContent({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialColor = searchParams.get("color");

  const [product, setProduct] = useState<ProductDetailSchema | null>(null);
  const [initialProduct, setInitialProduct] =
    useState<QuickViewProductSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(productDetailQuery(slug));

        if (!data) {
          router.push("/404");
          return;
        }

        setProduct(data);

        const initialVariant = data.variants.find(
          (item: ProductVariantSchema) => item.colorName === initialColor
        );

        // fallback if color not found
        const fallbackVariant =
          initialVariant || (data.variants.length > 0 ? data.variants[0] : null);

        if (fallbackVariant) {
          const filteredProduct = {
            ...data,
            variant: fallbackVariant,
          };

          // remove variants array for initial product
          delete filteredProduct.variants;
          setInitialProduct(filteredProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, initialColor, router]);

  if (loading) return <ProductDetailContentSkeleton />;
  if (!product || !initialProduct) return null;

  return (
    <div className="container mx-auto flex flex-col gap-12">
      <ProductDetailContent product={initialProduct} loading={loading} />
      {product.variants?.length > 1 && (
        <MoreColors product={product} initialProduct={initialProduct} />
      )}
      <RelevantProducts product={product} />
    </div>
  );
}
