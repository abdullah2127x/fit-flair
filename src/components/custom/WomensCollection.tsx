"use client";
import ContinuousCarousel from "@/components/custom/ContinuousCarousel";
import PrimaryHeading from "./PrimaryHeading";
import SubTitle from "@/components/custom/SubTitle";

type CollectionType = {
  src: string;
  title: string;
  href?: string;
  id: number | string;
};

const womenCollection: CollectionType[] = [
  {
    id: 1,
    src: "/images/women/3-piece-suit.jpg",
    title: "3 Piece Suits",
    href: "/collections/women/3piece",
  },
  {
    id: 2,
    src: "/images/women/jeans-trousers.jpg",
    title: "Jeans & Trousers",
    href: "/collections/women/jeans-trousers",
  },
  {
    id: 3,
    src: "/images/women/skirt.jpg",
    title: "Skirts",
    href: "/collections/women/skirt",
  },
  {
    id: 4,
    src: "/images/women/tracksuit.jpg",
    title: "Tracksuits & Gym Wear",
    href: "/collections/women/tracksuit",
  },
  {
    id: 5,
    src: "/images/women/kurti.jpg",
    title: "Kurti / Shirt",
    href: "/collections/women/kurti",
  },
  {
    id: 6,
    src: "/images/women/polo.jpg",
    title: "Polo Shirts",
    href: "/collections/women/polo",
  },
  {
    id: 7,
    src: "/images/women/t-shirt.jpg",
    title: "T-Shirts",
    href: "/collections/women/t-shirt",
  },
  {
    id: 8,
    src: "/images/women/dress.jpg",
    title: "Dresses & Maxi",
    href: "/collections/women/dress",
  },
  {
    id: 9,
    src: "/images/women/gown.jpg",
    title: "Gowns",
    href: "/collections/women/gown",
  },
  {
    id: 10,
    src: "/images/women/lehenga.jpg",
    title: "Lehenga Choli",
    href: "/collections/women/lehenga",
  },
  {
    id: 11,
    src: "/images/women/anarkali.jpg",
    title: "Anarkali Suits",
    href: "/collections/women/anarkali",
  },
  {
    id: 12,
    src: "/images/women/2-piece-suit.jpg",
    title: "2 Piece Suits",
    href: "/collections/women/2piece",
  },
];

const WomenCollection = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <PrimaryHeading>Women&apos;s Collection</PrimaryHeading>
      <SubTitle>Discover the latest trends in women&apos;s fashion.</SubTitle>

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
