"use client";

import ContinuousCarousel from "@/components/custom/ContinuousCarousel";
import SecondaryHeading from "./SecondaryHeading";
import EmblaCarousel from "./EmblaCarousel";
import ProductGrid from "./ProductGrid";

const images = [
  "Chambray",
  "Jersey",
  "Fleece",
  "Georgette",
  "Wool",
  "Denim",
  "Tulle",
  "Organza",
  "Nylon",
  "Silk",
  "Satin",
  "Linen",
];

const categories = [
  "unStitched",
  "men",
  "readyToWear",
  "women",
  "top",
  "bottom",
  "full",
    "readyToWear",
    "women",
    "top",
  "bottom",
  "full",
  "unStitched",
  "men",
  "readyToWear",
  "women",
  "top",
  "bottom",
  "full",
  "readyToWear",
  "women",
  "top",
  "bottom",
  "full",
  "unStitched",
  "men",
  "readyToWear",
  "women",
  "top",
  "bottom",
  "full",
  "readyToWear",
  "women",
  "top",
  "bottom",
  "full",
] as const;

// type Category = "Ready to Wear" | "Un Stitched";
type Category = (typeof categories)[number];

type Slide = {
  id:string
  src: string;
  title: Category;
  //   subTitle: Fabric;
  href?: string;
  linkEnabled: boolean;
};

// generate product array
const products: Slide[] = categories.map((category) => ({
  id: `category-${category}`,
  src: `/images/categories/${category}.webp`,
  title: category,
  href: `/collections/${category.toLowerCase()}`,
  linkEnabled: true,
}));

const Categories = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <SecondaryHeading className="text-3xl md:text-5xl">
        Shop By Categories
      </SecondaryHeading>

      <EmblaCarousel
        slides={products}
        autoPlay={false}
        slidesToShow={3}
        stepAutoPlay={true}
        stepAutoPlayDelay={5} // 1 slide every 4s
        showNavigation
        rounded="square"
        ripple
        rippleColor="white"
        emblaOptions={{ loop: true, align: "start" }}
        className="my-8"
        centerIfFew
        direction="backward"
      />

      {/* <ProductGrid rounded="square" slidesToShow={3} slides={products} /> */}
    </div>
  );
};

export default Categories;
