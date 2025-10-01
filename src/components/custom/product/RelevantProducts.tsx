// app/shop/[slug]/RelevantProducts.tsx
"use client";

import { client } from "@/sanity/lib/client";
import { relevantProductsQuery } from "@/lib/groqQueries";
import { ProductDetailSchema, ProductShowcaseSchema } from "@/types/product";
import ImageCard from "../ImageCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmblaCarousel from "../EmblaCarousel";
import PrimaryHeading from "../PrimaryHeading";
import SubTitle from "../SubTitle";
import SecondaryHeading from "../SecondaryHeading";

interface RelevantProductsProps {
  product: ProductDetailSchema;
}

export default function RelevantProducts({ product }: RelevantProductsProps) {
  const router = useRouter();
  const [relevantProducts, setRelevantProducts] = useState<
    ProductShowcaseSchema[]
  >([]);

  useEffect(() => {
    async function getRelevantProducts() {
      try {
        const data: ProductShowcaseSchema[] = await client.fetch(
          relevantProductsQuery({
            currentId: product.id,
            category: product.category,
            subCategory: product.subCategory, // fixed
            fabric: product.fabric,
            designs: product.designs,
            season: product.season,
            relevantTags: product.relevantTags,
            occasions: product.occasions,
            limit: 9,
          })
        );

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

        if (!data || data.length === 0) {
          setRelevantProducts([]);
          return;
        }

        setRelevantProducts(formatted);
      } catch (error) {
        console.error("Error fetching relevant products:", error);
        router.push("/404");
      }
    }

    getRelevantProducts();
  }, [product, router]);

  if (!relevantProducts || relevantProducts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col py-6 gap-y-4 w-full justify-center items-center">
      <div className="flex justify-between items-center w-full px-4">
        <SecondaryHeading> You Might Also Like</SecondaryHeading>
        <Link
          href={`/shop?category=${product.category}`}
          className="text-base font-medium text-primary-foreground hover:underline"
        >
          View all
        </Link>
      </div>
      {/* <SubTitle>Discover the latest trends in men&apos;s fashion.</SubTitle> */}

      <EmblaCarousel
        variant="showcase"
        changeColorOnHover
        slides={relevantProducts}
        slidesToShow={5}
        autoPlay={false}
        stepAutoPlay
        stepAutoPlayDelay={2}
        showNavigation={true}
        showPagination={true}
        buttonText={"View Detail"}
        navigationPosition="middle"
        rounded="square"
        mouseWheelDirection="horizontal"
      />
    </div>
  );
}
