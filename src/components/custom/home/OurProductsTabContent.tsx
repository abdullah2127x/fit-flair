"use client";

import React, { useEffect, useState } from "react";
import ProductGrid from "@/components/custom/ProductGrid";
import SubTitle from "@/components/custom/SubTitle";
import { TabsContent } from "@/components/ui/tabs";

import { client } from "@/sanity/lib/client";
import { ProductShowcaseSchema } from "@/types/product";

type ProductTabContentProps = {
  value: string; // tab value
  subtitle: string; // subtitle text
  query: string; // GROQ query
};

const ProductTabContent: React.FC<ProductTabContentProps> = ({
  value,
  subtitle,
  query,
}) => {
  const [products, setProducts] = useState<ProductShowcaseSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ✅ loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // start loading
      try {
        const data = await client.fetch(query);

        const formatted = data.map((item: any): ProductShowcaseSchema => {
          const customTags = [
            item.audience || "",
            item.fabric || "",
            ...(item.season || []),
            ...(item.designs || []),
            ...(item.occasions || []),
            item.outFitType || "",
            item.category || "",
            item.subCategory || "",
          ].filter(Boolean);

          const randomVariant = item.variants?.length
            ? item.variants[Math.floor(Math.random() * item.variants.length)]
            : null;

          return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            subTitle: item.subTitle,
            price: item.price,
            src: randomVariant?.featuredImage || "/fallback.jpg",
            colorName: randomVariant?.colorName || "",
            tags: customTags,
            discount: item.discount || 0,
          };
        });

        setProducts(formatted);
      } catch (error) {
        console.error(`Error fetching products for ${value}:`, error);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, [query, value]);

  return (
    <TabsContent value={value} className="flex flex-col gap-y-6 items-center">
      <SubTitle className="text-secondary-foreground">{subtitle}</SubTitle>
      {/* ✅ pass loading state */}
      <ProductGrid products={products} loading={loading} />
    </TabsContent>
  );
};

export default ProductTabContent;
