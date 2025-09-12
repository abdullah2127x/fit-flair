import React, { useEffect, useState } from "react";
import EmblaCarousel from "./EmblaCarousel";
import SubTitle from "./SubTitle";
import PrimaryHeading from "./PrimaryHeading";
import { ProductShowcaseSchema } from "@/schemas/product";
import { client } from "@/sanity/lib/client";
import { featuredCollectionQuery } from "@/lib/GroqQueries";

const FeaturedCollection = () => {
  const [products, setProducts] = useState<ProductShowcaseSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(featuredCollectionQuery);

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
        console.error(`Error fetching products: `, error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <PrimaryHeading>Featured Collection</PrimaryHeading>
      <SubTitle>Discover the latest trends in men&apos;s fashion.</SubTitle>

      <EmblaCarousel
        changeColorOnHover
        slides={products}
        slidesToShow={4}
        autoPlay={false}
        stepAutoPlay
        stepAutoPlayDelay={2}
        showNavigation={true}
        showPagination={true}
        navigationPosition="middle"
        rounded="square"
        mouseWheelDirection="horizontal"
      />
    </div>
  );
};

export default FeaturedCollection;
