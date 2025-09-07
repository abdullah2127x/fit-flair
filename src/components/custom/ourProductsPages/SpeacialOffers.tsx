"use client";

import React, { useEffect, useState } from "react";
import ProductGrid from "../ProductGrid";
import SubTitle from "../SubTitle";
import { TabsContent } from "@/components/ui/tabs";
import { LatestProductsType } from "../OurProducts";
import { client } from "@/sanity/lib/client";

// GROQ query
const query = `*[
  _type == "product" &&
  defined(discount) && discount > 0 &&
  defined(title) &&
  defined(slug.current) &&
  defined(description) &&
  defined(price) &&
  defined(variants)
] | order(discount desc)
    [0..7]
  {
  "id": _id,
  title,
  subTitle,
  "slug": slug.current,
  price,
  "category": category,
  season,
  "subCategory": subCategory,
  "fabric": fabric->name,
  "audience": audience,
  variants[] {
    stock,
    "featuredImage": featuredImage.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "colorName": color->name,
    "colorCode": color->code
  },
  "description": pt::text(description),
  "uploadedAt": _createdAt,
  isFeatured,
  isNewArrival,
  relevantTags,
  "outFitType": select(
    audience == "men" => menOutfitType,
    audience == "women" => menOutfitType,
    []
  ),
  discount
}`;

const SpeacialOffers = () => {
  const [speacialOffers, setSpeacialOffers] = useState<LatestProductsType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(query);

        const formatted = data.map((item: any) => {
          // build custom tags array
          const customTags = [
            // ...(item.relevantTags || []), // existing tags from Sanity
            item.audience || "", // audience (men, women, kids)
            item.discount || 0, // discount (percentage)
            item.fabric || "", // fabric (cotton, silk, etc.)
            ...(item.season || []), // outfit type array
            item.outFitType || "", // outfit type array
            item.category || "", // category (shirts, trousers, etc.)
            item.subCategory || "", // sub-category if defined
          ].filter(Boolean); // remove empty values

          return {
            id: item.id,
            title: item.title,
            subTitle: item.subTitle,
            price: item.price,
            src: item.variants?.[0]?.featuredImage || "/fallback.jpg",
            colorCode: item.variants?.[0]?.colorCode || "",
            colorName: item.variants?.[0]?.colorName || "",
            tags: customTags, // 👈 now all merged
            href: `/products/${item.slug}`,
            showAddToCart: true,
            buttonText: "View Detail",
          };
        });
        console.log("the formatted data that we get is : ", formatted);
        setSpeacialOffers(formatted);
      } catch (error) {
        console.error("Error fetching special offers:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <TabsContent value="sale" className="flex flex-col gap-y-6 items-center">
      <SubTitle>Special offers just for you.</SubTitle>
      <ProductGrid rounded="square" slides={speacialOffers} />
    </TabsContent>
  );
};

export default SpeacialOffers;
