"use client";

import React, { useEffect, useState } from "react";
import ProductGrid from "@/components/custom/ProductGrid";
import SubTitle from "@/components/custom/SubTitle";
import { TabsContent } from "@/components/ui/tabs";
import { OurProductsType } from "@/components/custom/OurProducts";
import { client } from "@/sanity/lib/client";

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
  const [products, setProducts] = useState<OurProductsType[]>([]);

  useEffect(() => {
  console.log(`[${value}] useEffect started → query:`, query);

  const fetchData = async () => {
    try {
      console.log(`[${value}] Fetching products...`);

      const data = await client.fetch(query);

      console.log(`[${value}] Fetch successful. Raw data:`, data);

      if (!data || data.length === 0) {
        console.warn(`[${value}] No products returned from Sanity.`);
      }

      const formatted = data.map((item: any, idx: number) => {
        console.log(`[${value}] Mapping product #${idx}:`, item);
        return {
          id: item.id,
          title: item.title,
          subTitle: item.subTitle,
          price: item.price,
          src: item.variants?.[0]?.featuredImage || "/fallback.jpg",
          colorCode: item.variants?.[0]?.colorCode || "",
          colorName: item.variants?.[0]?.colorName || "",
          tags: [
            item.audience || "",
            item.fabric || "",
            ...(item.season || []),
            item.outFitType || "",
            item.category || "",
            item.subCategory || "",
          ].filter(Boolean),
          href: `/products/${item.slug}`,
          showAddToCart: true,
          buttonText: "View Detail",
          discount: item.discount || 0,
        };
      });

      console.log(`[${value}] Products formatted:`, formatted);
      setProducts(formatted);

      console.log(`[${value}] Fetch & state update complete ✅`);
    } catch (error: any) {
      console.error(`[${value}] Error fetching products:`, error?.message || error);
      console.error(`[${value}] Full error object:`, error);
    }
  };

  fetchData();
}, [query, value]);

  // console.log(
  //   "the our products tab content component re-rendered before use effect"
  // );
  // useEffect(() => {
  //   console.log(
  //     "the our products tab content component re-rendered inside use effect"
  //   );
  //   const fetchData = async () => {
  //     try {
  //       const data = await client.fetch(query);
  //       console.log(`Fetched products for ${value}:`, data);

  //       const formatted = data.map((item: any) => {
  //         const customTags = [
  //           item.audience || "",
  //           item.fabric || "",
  //           ...(item.season || []),
  //           item.outFitType || "",
  //           item.category || "",
  //           item.subCategory || "",
  //         ].filter(Boolean);

  //         return {
  //           id: item.id,
  //           title: item.title,
  //           subTitle: item.subTitle,
  //           price: item.price,
  //           src: item.variants?.[0]?.featuredImage || "/fallback.jpg",
  //           colorCode: item.variants?.[0]?.colorCode || "",
  //           colorName: item.variants?.[0]?.colorName || "",
  //           tags: customTags,
  //           href: `/products/${item.slug}`,
  //           showAddToCart: true,
  //           buttonText: "View Detail",
  //           discount: item.discount || 0,
  //         };
  //       });

  //       setProducts(formatted);
  //     } catch (error) {
  //       console.error(`Error fetching products for ${value}:`, error);
  //     }
  //   };

  //   fetchData();
  // }, [query, value]);

  return (
    <TabsContent value={value} className="flex flex-col gap-y-6 items-center">
      <SubTitle>{subtitle}</SubTitle>
      <ProductGrid rounded="square" slides={products} changeColorOnHover />
    </TabsContent>
  );
};

export default ProductTabContent;
