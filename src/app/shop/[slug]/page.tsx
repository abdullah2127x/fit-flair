// app/shop/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";

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

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params); // ✅ unwrap the Promise
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialColor = searchParams.get("color");

  const [product, setProduct] = useState<ProductDetailSchema | null>(null);
  const [initialProduct, setInitialProduct] =
    useState<QuickViewProductSchema | null>(null);

  const [loading, setLoading] = useState(true);
  // const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // Fetch product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(productDetailQuery(slug));
        if (!data) {
          router.push("/404");
          return;
        }
        // // ✅ artificially expand variants for testing
        // while (data.variants.length < 9) {
        //   data.variants.push({
        //     ...data.variants[0], // copy first variant
        //     colorName: `TestColor${data.variants.length}`, // give unique names
        //   });
        // }

        setProduct(data);

        const initialVariant = data.variants.find(
          (item: ProductVariantSchema) => item.colorName === initialColor
        );

        // if no match, fall back to first variant
        const fallbackVariant =
          initialVariant ||
          (data.variants.length > 0 ? data.variants[0] : null);

        if (fallbackVariant) {
          const filteredProduct = {
            ...data,
            variant: fallbackVariant, // ✅ either the matched color OR the first variant
          };

          delete filteredProduct.variants; // ❌ remove variants array

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
  }, [slug, initialColor,router]);

  if (loading) return <ProductDetailContentSkeleton />;

  if (!product || !initialProduct) return null;

  return (
    <div className="container mx-auto flex flex-col gap-12">
      <ProductDetailContent product={initialProduct} loading={loading} />
      {product && product.variants?.length > 1 && (
        <MoreColors product={product} initialProduct={initialProduct} />
      )}
      <RelevantProducts product={product} />
    </div>
  );
}
