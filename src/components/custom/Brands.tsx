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

const brands = [
  "unStitched",
  "men",
  "readyToWear",
  "women",
  "top",
  "bottom",
  "full",
] as const;

// type Category = "Ready to Wear" | "Un Stitched";
type Category = (typeof brands)[number];

type Slide = {
  src: string;
  title: Category;
  //   subTitle: Fabric;
  href?: string;
  id: string | number;
};

// generate product array
const products: Slide[] = brands.map((brand) => ({
  src: `/images/categories/${brand}.webp`,
  title: brand,
  href: `/collections/${brand.toLowerCase()}`,
  id: brand,
}));

const Brands = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <SecondaryHeading>
        Deal With Brands
      </SecondaryHeading>

      {/* <EmblaCarousel
        slides={products}
        autoPlay={false}
        slidesToShow={4}
        stepAutoPlay={true}
        stepAutoPlayDelay={4} // 1 slide every 4s
        stepAutoPlayDirection="prev" // or "prev"
        showNavigation
        rounded="square"
        ripple
        rippleColor="white"
        emblaOptions={{ loop: true, align: "start" }}
        className="my-8"
        centerIfFew
      /> */}

      <ProductGrid rounded="square" slidesToShow={4} slides={products} />
    </div>
  );
};

export default Brands;
