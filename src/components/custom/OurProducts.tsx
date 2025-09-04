import React from "react";
import PrimaryHeading from "./PrimaryHeading";
import SubTitle from "./SubTitle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductGrid from "./ProductGrid";
import NewArrival from "./latest/NewArrival";
import Popular from "./latest/Popular";
import SpeacialOffers from "./latest/SpeacialOffers";
import Trending from "./latest/Trending";

export type LatestProductsType = {
  id: number;
  title: string;
  subTitle: string;
  price: number;
  src: string;
  href: string;
  showAddToCart: boolean;
  buttonText: string;
};

// Example product arrays for each tab
const newArrivals: LatestProductsType[] = [
  {
    id: 1,
    title: "Casual Shirt",
    subTitle: "Perfect for everyday wear",
    price: 35,
    src: "/images/men/t-shirt.jpg",
    href: "/products/casual-shirt",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 2,
    title: "Formal Shirt",
    subTitle: "Sharp & professional",
    price: 50,
    src: "/images/men/formal-shirt.jpg",
    href: "/products/formal-shirt",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 3,
    title: "Kurta",
    subTitle: "Traditional & stylish",
    price: 40,
    src: "/images/men/kurta.jpg",
    href: "/products/kurta",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 4,
    title: "Jeans",
    subTitle: "Classic denim comfort",
    price: 55,
    src: "/images/men/jeans.jpg",
    href: "/products/jeans",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 5,
    title: "Trousers",
    subTitle: "Smart & relaxed fit",
    price: 45,
    src: "/images/men/trouser.jpg",
    href: "/products/trousers",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 6,
    title: "Formal Suit",
    subTitle: "Perfect for occasions",
    price: 120,
    src: "/images/men/formal-suit.jpg",
    href: "/products/formal-suit",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 7,
    title: "Tracksuit",
    subTitle: "Sporty & comfy",
    price: 65,
    src: "/images/men/tracksuit.jpg",
    href: "/products/tracksuit",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 8,
    title: "Sherwani",
    subTitle: "Elegant traditional wear",
    price: 150,
    src: "/images/men/sherwani.jpg",
    href: "/products/sherwani",
    showAddToCart: true,
    buttonText: "View Detail",
  },
];

const popularProducts = [
  {
    id: 9,
    title: "Hoodie",
    subTitle: "Warm & comfy style",
    price: 45,
    src: "/images/men/hoodie.jpg",
    href: "/products/hoodie",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 10,
    title: "Denim Jacket",
    subTitle: "Rugged fashion essential",
    price: 70,
    src: "/images/men/jacket.jpg",
    href: "/products/denim-jacket",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 11,
    title: "Polo Shirt",
    subTitle: "Smart casual must-have",
    price: 30,
    src: "/images/men/polo.jpg",
    href: "/products/polo-shirt",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 12,
    title: "Sweatpants",
    subTitle: "Relaxed fit comfort",
    price: 40,
    src: "/images/men/sweatpants.jpg",
    href: "/products/sweatpants",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 13,
    title: "Leather Jacket",
    subTitle: "Bold & stylish",
    price: 200,
    src: "/images/men/leather-jacket.jpg",
    href: "/products/leather-jacket",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 14,
    title: "Kurta Pajama",
    subTitle: "Traditional comfort",
    price: 55,
    src: "/images/men/kurta-pajama.jpg",
    href: "/products/kurta-pajama",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 15,
    title: "Casual Sneakers",
    subTitle: "Everyday footwear",
    price: 60,
    src: "/images/men/sneakers.jpg",
    href: "/products/casual-sneakers",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 16,
    title: "Wool Sweater",
    subTitle: "Cozy winter wear",
    price: 50,
    src: "/images/men/sweater.jpg",
    href: "/products/wool-sweater",
    showAddToCart: true,
    buttonText: "View Detail",
  },
];

const specialOffers = [
  {
    id: 17,
    title: "T-shirt Sale",
    subTitle: "Limited time discount",
    price: 20,
    src: "/images/men/t-shirt.jpg",
    href: "/products/tshirt-sale",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 18,
    title: "Jeans Discount",
    subTitle: "Buy 1 Get 1 Free",
    price: 50,
    src: "/images/men/jeans.jpg",
    href: "/products/jeans-discount",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 19,
    title: "Kurta Special",
    subTitle: "Save 20% today",
    price: 32,
    src: "/images/men/kurta.jpg",
    href: "/products/kurta-special",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 20,
    title: "Formal Suit Deal",
    subTitle: "Flat 25% off",
    price: 90,
    src: "/images/men/formal-suit.jpg",
    href: "/products/formal-suit-deal",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 21,
    title: "Tracksuit Sale",
    subTitle: "Special sportswear offer",
    price: 50,
    src: "/images/men/tracksuit.jpg",
    href: "/products/tracksuit-sale",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 22,
    title: "Sherwani Deal",
    subTitle: "Save big on traditionals",
    price: 120,
    src: "/images/men/sherwani.jpg",
    href: "/products/sherwani-deal",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 23,
    title: "Polo Shirt Offer",
    subTitle: "Flat 15% discount",
    price: 25,
    src: "/images/men/polo.jpg",
    href: "/products/polo-offer",
    showAddToCart: true,
    buttonText: "View Detail",
  },
  {
    id: 24,
    title: "Winter Hoodie Deal",
    subTitle: "Extra warm, extra savings",
    price: 35,
    src: "/images/men/hoodie.jpg",
    href: "/products/winter-hoodie-deal",
    showAddToCart: true,
    buttonText: "View Detail",
  },
];


const OurProducts = () => {
  return (
    <div className="flex flex-col gap-y-6 pb-6 w-full justify-center items-center">
      <PrimaryHeading>Our Products</PrimaryHeading>

      <Tabs defaultValue="new" className="w-full flex flex-col  gap-y-6">
        {/* Tab Buttons */}
        <TabsList className="flex gap-6 justify-center w-fit mx-auto ">
          <TabsTrigger value="new">New Arrivals</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="sale">Special Offers</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

      
        <NewArrival />
        <Popular />
        <SpeacialOffers />
        <Trending />
      </Tabs>
    </div>
  );
};

export default OurProducts;
