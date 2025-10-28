"use client";

import ContinuousCarousel from "@/components/custom/ContinuousCarousel";
import PrimaryHeading from "@/components/custom/PrimaryHeading";
import SubTitle from "@/components/custom/SubTitle";
import { ProductCollectionSchema } from "@/types/product";

const menCollection: ProductCollectionSchema[] = [
  {
    id: "1",
    src: "/images/men/polo.jpg",
    title: "Polo Shirts",
    slug: "?audience=men&outfitTypes=polo",
  },
  {
    id: "2",
    src: "/images/men/t-shirt.jpg",
    title: "T-Shirts",
    slug: "?audience=men&outfitTypes=t-shirt",
  },
  {
    id: "3",
    src: "/images/men/formal-shirt.jpg",
    title: "Formal Shirts",
    slug: "?audience=men&outfitTypes=formal-shirt",
  },
  {
    id: "4",
    src: "/images/men/kurta.jpg",
    title: "Kurta",
    slug: "?audience=men&outfitTypes=kurta",
  },
  {
    id: "5",
    src: "/images/men/jeans.jpg",
    title: "Jeans",
    slug: "?audience=men&outfitTypes=jeans",
  },
  {
    id: "6",
    src: "/images/men/trouser.jpg",
    title: "Trousers",
    slug: "?audience=men&outfitTypes=trouser",
  },
  {
    id: "7",
    src: "/images/men/formal-suit.jpg",
    title: "Formal Suit",
    slug: "?audience=men&outfitTypes=formal-suit",
  },
  {
    id: "8",
    src: "/images/men/tracksuit.jpg",
    title: "Tracksuit",
    slug: "?audience=men&outfitTypes=tracksuit",
  },
  {
    id: "9",
    src: "/images/men/sherwani.jpg",
    title: "Sherwani",
    slug: "?audience=men&outfitTypes=sherwani",
  },
];

const MenCollection = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <PrimaryHeading>Men&apos;s Collection</PrimaryHeading>
      <SubTitle>Discover the latest trends in men&apos;s fashion.</SubTitle>

      {/* <ProductGrid rounded="square" slidesToShow={4} slides={products} /> */}
      <ContinuousCarousel
        slides={menCollection}
        slidesToShow={5}
        autoPlaySpeed={2}
        stopOnHover
        rounded="circle"
        emblaOptions={{ loop: true, align: "start" }}
        className="my-8"
        centerIfFew
        enableMouseWheel
        mouseWheelDirection="horizontal"
        mouseWheelSensitivity={1}
        direction="backward"
        buttonText="Show All"
      />
    </div>
  );
};

export default MenCollection;
