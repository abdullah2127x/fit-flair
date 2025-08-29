"use client";

import ContinuousCarousel from "@/components/custom/ContinuousCarousel";
import SecondaryHeading from "./SecondaryHeading";

import EmblaCarousel from "./EmblaCarousel";
import ProductGrid from "./ProductGrid";
import PrimaryHeading from "./PrimaryHeading";
import SubTitle from "./subTitle";

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

// Define your Men categories
const menCategories = [
  "Polo Shirts",
  "T-Shirts",
  "Formal Shirts",
  "Kurta",
  "Jeans",
  "Trousers",
  "Sherwani",
  "Formal Suit",
] as const;

type CollectionType = {
  src: string;
  title: string;
  href?: string;
};

const womenCollection: CollectionType[] = [
  {
    src: "/images/women/3-piece-suit.jpg",
    title: "3 Piece Suits",
    href: "/collections/women/3piece",
  },
  {
    src: "/images/women/jeans-trousers.jpg",
    title: "Jeans & Trousers",
    href: "/collections/women/jeans-trousers",
  },
  {
    src: "/images/women/skirt.jpg",
    title: "Skirts",
    href: "/collections/women/skirt",
  },
  {
    src: "/images/women/tracksuit.jpg",
    title: "Tracksuits & Gym Wear",
    href: "/collections/women/tracksuit",
  },
  {
    src: "/images/women/kurti.jpg",
    title: "Kurti / Shirt",
    href: "/collections/women/kurti",
  },
  {
    src: "/images/women/polo.jpg",
    title: "Polo Shirts",
    href: "/collections/women/polo",
  },
  {
    src: "/images/women/t-shirt.jpg",
    title: "T-Shirts",
    href: "/collections/women/t-shirt",
  },
  {
    src: "/images/women/dress.jpg",
    title: "Dresses & Maxi",
    href: "/collections/women/dress",
  },
  {
    src: "/images/women/gown.jpg",
    title: "Gowns",
    href: "/collections/women/gown",
  },
  {
    src: "/images/women/lehenga.jpg",
    title: "Lehenga Choli",
    href: "/collections/women/lehenga",
  },
  {
    src: "/images/women/anarkali.jpg",
    title: "Anarkali Suits",
    href: "/collections/women/anarkali",
  },
  {
    src: "/images/women/2-piece-suit.jpg",
    title: "2 Piece Suits",
    href: "/collections/women/2piece",
  },
];

const WomenCollection = () => {
  return (
    <div className="flex flex-col gap-y-2 w-full justify-center items-center">
      <PrimaryHeading>Women's Collection</PrimaryHeading>
      <SubTitle>Discover the latest trends in women's fashion.</SubTitle>

      {/* <ProductGrid rounded="square" slidesToShow={4} slides={products} /> */}
      <ContinuousCarousel
        slides={womenCollection}
        slidesToShow={5}
        autoPlaySpeed={2}
        stopOnHover
        rounded="circle"
        ripple
        rippleColor="gold"
        emblaOptions={{ loop: true, align: "start" }}
        className="my-8"
        centerIfFew
        enableMouseWheel
        mouseWheelDirection="horizontal"
        mouseWheelSensitivity={1}
        direction="forward"
        showAddToCart={false}
        buttonText="Show All"
      />
    </div>
  );
};

export default WomenCollection;
