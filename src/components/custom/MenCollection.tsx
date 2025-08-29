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

const menCollection: CollectionType[] = [
  {
    src: "/images/men/polo.jpg",
    title: "Polo Shirts",
    href: "/collections/men/polo",
  },
  {
    src: "/images/men/t-shirt.jpg",
    title: "T-Shirts",
    href: "/collections/men/t-shirt",
  },
  {
    src: "/images/men/formal-shirt.jpg",
    title: "Formal Shirts",
    href: "/collections/men/formal-shirt",
  },
  {
    src: "/images/men/kurta.jpg",
    title: "Kurta",
    href: "/collections/men/kurta",
  },
  {
    src: "/images/men/jeans.jpg",
    title: "Jeans",
    href: "/collections/men/jeans",
  },
  {
    src: "/images/men/trouser.jpg",
    title: "Trousers",
    href: "/collections/men/trouser",
  },
  {
    src: "/images/men/formal-suit.jpg",
    title: "Formal Suit",
    href: "/collections/men/formal-suit",
  },
  {
    src: "/images/men/tracksuit.jpg",
    title: "Tracksuit",
    href: "/collections/men/tracksuit",
  },
  {
    src: "/images/men/sherwani.jpg",
    title: "Sherwani",
    href: "/collections/men/sherwani",
  },
];

const MenCollection = () => {
  return (
    <div className="flex flex-col gap-y-2 w-full justify-center items-center">
      <PrimaryHeading>Men's Collection</PrimaryHeading>
    <SubTitle>Discover the latest trends in men's fashion.</SubTitle>

      {/* <ProductGrid rounded="square" slidesToShow={4} slides={products} /> */}
      <ContinuousCarousel
        slides={menCollection}
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
        direction="backward"
        showAddToCart={false}
        buttonText="Show All"
      />
    </div>
  );
};

export default MenCollection;
