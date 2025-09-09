"use client";
import ContinuousCarousel from "@/components/custom/ContinuousCarousel";
import PrimaryHeading from "./PrimaryHeading";
import SubTitle from "@/components/custom/SubTitle";
import { ProductCollectionSchema } from "@/schemas/product";

const womenCollection: ProductCollectionSchema[] = [
  {
    id: "1",
    slug: "/collections/women/3piece",
    src: "/images/women/3-piece-suit.jpg",
    title: "3 Piece Suits",
  },
  {
    id: "2",
    slug: "/collections/women/jeans-trousers",
    src: "/images/women/jeans-trousers.jpg",
    title: "Jeans & Trousers",
  },
  {
    id: "3",
    slug: "/collections/women/skirt",
    src: "/images/women/skirt.jpg",
    title: "Skirts",
  },
  {
    id: "4",
    slug: "/collections/women/tracksuit",
    src: "/images/women/tracksuit.jpg",
    title: "Tracksuits & Gym Wear",
  },
  {
    id: "5",
    slug: "/collections/women/kurti",
    src: "/images/women/kurti.jpg",
    title: "Kurti / Shirt",
  },
  {
    id: "6",
    slug: "/collections/women/polo",
    src: "/images/women/polo.jpg",
    title: "Polo Shirts",
  },
  {
    id: "7",
    slug: "/collections/women/t-shirt",
    src: "/images/women/t-shirt.jpg",
    title: "T-Shirts",
  },
  {
    id: "8",
    slug: "/collections/women/dress",
    src: "/images/women/dress.jpg",
    title: "Dresses & Maxi",
  },
  {
    id: "9",
    slug: "/collections/women/gown",
    src: "/images/women/gown.jpg",
    title: "Gowns",
  },
  {
    id: "10",
    slug: "/collections/women/lehenga",
    src: "/images/women/lehenga.jpg",
    title: "Lehenga Choli",
  },
  {
    id: "11",
    slug: "/collections/women/anarkali",
    src: "/images/women/anarkali.jpg",
    title: "Anarkali Suits",
  },
  {
    id: "12",
    slug: "/collections/women/2piece",
    src: "/images/women/2-piece-suit.jpg",
    title: "2 Piece Suits",
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
        // ripple
        // rippleColor="gold"
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
