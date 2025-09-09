"use client";

import ContinuousCarousel from "@/components/custom/ContinuousCarousel";
import PrimaryHeading from "./PrimaryHeading";
import SubTitle from "@/components/custom/SubTitle";

type CollectionType = {
  src: string;
  title: string;
  href?: string;
};

const menCollection: (CollectionType & { id: number })[] = [
  {
    id: 1,
    src: "/images/men/polo.jpg",
    title: "Polo Shirts",
    href: "/collections/men/polo",
  },
  {
    id: 2,
    src: "/images/men/t-shirt.jpg",
    title: "T-Shirts",
    href: "/collections/men/t-shirt",
  },
  {
    id: 3,
    src: "/images/men/formal-shirt.jpg",
    title: "Formal Shirts",
    href: "/collections/men/formal-shirt",
  },
  {
    id: 4,
    src: "/images/men/kurta.jpg",
    title: "Kurta",
    href: "/collections/men/kurta",
  },
  {
    id: 5,
    src: "/images/men/jeans.jpg",
    title: "Jeans",
    href: "/collections/men/jeans",
  },
  {
    id: 6,
    src: "/images/men/trouser.jpg",
    title: "Trousers",
    href: "/collections/men/trouser",
  },
  {
    id: 7,
    src: "/images/men/formal-suit.jpg",
    title: "Formal Suit",
    href: "/collections/men/formal-suit",
  },
  {
    id: 8,
    src: "/images/men/tracksuit.jpg",
    title: "Tracksuit",
    href: "/collections/men/tracksuit",
  },
  {
    id: 9,
    src: "/images/men/sherwani.jpg",
    title: "Sherwani",
    href: "/collections/men/sherwani",
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
        // ripple
        // rippleColor="gold"
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
