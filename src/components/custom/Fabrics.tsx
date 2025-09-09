"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ImageCard from "./ImageCard";
import PrimaryHeading from "./PrimaryHeading";
import SubTitle from "./SubTitle";
import { ProductCollectionSchema } from "@/schemas/product";

interface CarouselCompProps {
  products: ProductCollectionSchema[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const CarouselComp = ({
  products,
  className,
  autoplay = true,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: CarouselCompProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full py-4", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 1000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="flex h-[500px] w-full">
        {products.map((product, index) => (
          <CarouselItem
            key={index}
            className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(15% 0 15% 0 round 2rem)"
                    : "inset(0 0 0 0 round 2rem)",
              }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div className="relative h-full w-full overflow-hidden">
                <ImageCard
                  id={product.id}
                  src={product.src}
                  slug={product.slug}
                  aspectRatio="h-full"
                  rounded="square"
                />
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-primary text-lg"
                >
                  {product.title}
                </motion.div>
              )}
            </AnimatePresence>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && (
        <div className="absolute bottom-8 right-0 flex w-full items-center justify-between gap-2 px-4">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="rounded-full bg-secondary hover:bg-secondary/90 p-2"
          >
            <ChevronLeft className="text-secondary-foreground size-7" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="rounded-full bg-secondary hover:bg-secondary/90 p-2"
          >
            <ChevronRight className="text-secondary-foreground size-7" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: products.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all",
                  current === index ? "bg-black" : "bg-[#D9D9D9]"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};

// ==============Main Fabrics======================
const FabricCollection = () => {
  const fabrics = [
    "Chiffon",
    "Cotton",
    "Polyester",
    "Crepe",
    "Rayon",
    "Leather",
    "Velvet",
    "Satin",
    "Denim",
    "Organza",
    "Nylon",
    "Silk",
    "Linen",
    "Wool",
    "Georgette",
    "Tulle",
    "Jersey",
    "Fleece",
    "Chambray",
  ] as const;

  // generate product array
  const products: ProductCollectionSchema[] = fabrics.map(
    (fabric, index): ProductCollectionSchema => ({
      id: (index + 1).toString(),
      slug: `/shop/${fabric.toLowerCase()}`,
      src: `/images/fabrics/${fabric}.webp`,
      title: fabric,
    })
  );

  return (
    <div className="flex flex-col gap-y-4 h-full w-screen items-center justify-center overflow-hidden ">
      <PrimaryHeading>Fabric Collection</PrimaryHeading>
      <SubTitle>
        Explore premium fabrics crafted for comfort and style.
      </SubTitle>

      <CarouselComp
        products={products}
        className=""
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
};

export default FabricCollection;
