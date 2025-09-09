// *[
//     _type == "product" &&
//     defined(title) &&
//     defined(slug.current) &&
//     defined(description) &&
//     defined(price) &&
//     defined(variants)
//   ]
//   {
//   "id":_id,
//   title,
//   subTitle,
//   "slug": slug.current,
//   price,
//   discount,
//   "category": category,
//   "subCategory": subCategory,
//   "fabric": fabric->name,
//   "audience": audience,
//   designs,
//   occasions,
//   variants[] {
//     stock,
//     "featuredImage": featuredImage.asset->url,
//     "additionalImages": additionalImages[].asset->url,
//     "colorName": color->name,
//     "colorCode": color->code,
//   },
//   "description": pt::text(description),
//   "uploadedAt":_createdAt,
//   isFeatured,
//   isNewArrival,
//   isPopular,
//   relevantTags,
//   "outFitType": select(
//     audience == "men" => menOutfitType,
//     audience == "women" => menOutfitType,
//     [] // fallback empty array
//   ),

// }

// "use client";
// import SecondaryHeading from "./SecondaryHeading";
// import EmblaCarousel from "./EmblaCarousel";

// const slides = [
//   "/carouselImages/image1.jpg",
//   "/carouselImages/image2.jpg",
//   "/carouselImages/image3.jpg",
//   "/carouselImages/image4.jpg",
//   "/carouselImages/image5.jpg",
//   "/carouselImages/image1.jpg",
//   "/carouselImages/image2.jpg",
//   "/carouselImages/image3.jpg",
//   "/carouselImages/image4.jpg",
//   "/carouselImages/image5.jpg",
// ];
// const fabrics = [
//   "Chiffon",
//   "Cotton",
//   "Polyester",
//   "Crepe",
//   "Rayon",
//   "Leather",
//   "Velvet",
//   "Satin",
//   "Denim",
//   "Organza",
//   "Nylon",
//   "Silk",
//   "Linen",
//   "Wool",
//   "Georgette",
//   "Tulle",
//   "Jersey",
//   "Fleece",
//   "Chambray",
// ] as const;

// type Category = "Ready to Wear" | "Un Stitched";
// type Fabric = (typeof fabrics)[number];

// type Slide = {
//   id: string | number;
//   src: string;
//   title: Fabric;
//   href?: string;
// };

// // generate product array
// const products: Slide[] = fabrics.map((fabric, index) => ({
//   src: `/images/fabrics/${fabric}.webp`,
//   title: fabric,
//   href: `/collections/${fabric.toLowerCase()}`,
//   id: index + 1,
// }));

// const Fabrics = () => {
//   return (
//     <div className="flex flex-col gap-y-4 w-full justify-center items-center">
//       <SecondaryHeading className="text-3xl md:text-5xl">
//         FABRICS
//       </SecondaryHeading>

//       <EmblaCarousel
//         slides={products}
//         slidesToShow={3}
//         stepAutoPlay
//         showNavigation
//         autoPlaySpeed={2}
//         stopOnHover
//         rounded="square"
//         emblaOptions={{ loop: true, align: "start" }}
//         centerIfFew
//         showPagination
//         mouseWheelDirection="horizontal"
//         freeScroll={false}
//       />
//     </div>
//   );
// };

// export default Fabrics;

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

type Fabric = (typeof fabrics)[number];

type Slide = {
  id: string | number;
  src: string;
  title: Fabric;
  href?: string;
};

const Skiper54 = () => {
  // generate product array
  const images: Slide[] = fabrics.map((fabric, index) => ({
    id: index + 1,
    src: `/images/fabrics/${fabric}.webp`,
    title: fabric,
    href: `/collections/${fabric.toLowerCase()}`,
  }));

  return (
    <div className="flex flex-col gap-y-4 h-full w-screen items-center justify-center overflow-hidden ">
      <PrimaryHeading>Fabric Collection</PrimaryHeading>
      <SubTitle>
        Explore premium fabrics crafted for comfort and style.
      </SubTitle>

      <Carousel_006
        images={images}
        className=""
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
};

interface Carousel_006Props {
  images: Slide[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = true,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) => {
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
        {images.map((slide, index) => (
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
                  id={slide.title.toString()}
                  src={slide.src}
                  href={slide.href}
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
                  {slide.title}
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
            {Array.from({ length: images.length }).map((_, index) => (
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

export default Skiper54;
