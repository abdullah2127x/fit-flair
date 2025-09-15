"use client";

import React, { useEffect, useState } from "react";
import ProductGrid from "@/components/custom/ProductGrid";
import SubTitle from "@/components/custom/SubTitle";
import { TabsContent } from "@/components/ui/tabs";

import { client } from "@/sanity/lib/client";
import { ProductShowcaseSchema } from "@/schemas/product";

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

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, [query, value]);

  return (
    <TabsContent value={value} className="flex flex-col gap-y-6 items-center">
      <SubTitle className="text-secondary-foreground">{subtitle}</SubTitle>
      <ProductGrid products={products} />
    </TabsContent>
  );
};

export default ProductTabContent;
