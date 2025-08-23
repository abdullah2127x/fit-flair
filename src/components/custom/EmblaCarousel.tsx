"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageCard from "./ImageCard";


type SlideType = {
  src: string;
  title?: string;
  subTitle?: string;
  href?: string; // 👈 optional URL
  linkEnabled?: boolean;
};

type CarouselProps = {
  slides: SlideType[];
  slidesToShow?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  emblaOptions?: EmblaOptionsType;
  className?: string;

  // 🔹 interactive features
  showPagination?: boolean;
  paginationPosition?: "below" | "center";
  showNavigation?: boolean;
  navigationPosition?: "middle" | "below";
  stopOnHover?: boolean;
  freeScroll?: boolean;
  centerIfFew?: boolean;
  centerScale?: boolean;
};

const EmblaCarousel: React.FC<CarouselProps> = ({
  slides,
  slidesToShow = 6,
  autoPlay = false, // Changed default to false for interactive carousel
  autoPlaySpeed = 2,
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  emblaOptions = { loop: true },
  className = "",
  showPagination = false,
  paginationPosition = "below",
  showNavigation = false,
  navigationPosition = "middle",
  stopOnHover = true,
  freeScroll = true,
  centerIfFew = true,
  centerScale = false,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...emblaOptions,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: freeScroll,
    },
    autoPlay
      ? [
          AutoScroll({
            playOnInit: true,
            speed: autoPlaySpeed,
            stopOnInteraction: true, // Changed to true for interactive carousel
          }),
        ]
      : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScroll, setCanScroll] = useState(false);

  // Sync pagination
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // check if scrolling is possible
  const checkCanScroll = useCallback(() => {
    if (!emblaApi) return;
    const snaps = emblaApi.scrollSnapList();
    const slides = emblaApi.slideNodes();
    // If there’s only one snap point OR all slides fit → disable nav
    setCanScroll(snaps.length > 1 && slides.length > slidesToShow);
  }, [emblaApi, slidesToShow]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", checkCanScroll);
    emblaApi.on("resize", checkCanScroll);

    // initial check
    checkCanScroll();
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", checkCanScroll);
      emblaApi.off("resize", checkCanScroll);
    };
  }, [emblaApi, onSelect, checkCanScroll]);

  // autoplay hover stop
  useEffect(() => {
    if (!emblaApi || !stopOnHover) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (!autoScroll) return;

    const node = emblaApi.rootNode();
    const handleMouseEnter = () => autoScroll.stop();
    const handleMouseLeave = () => autoScroll.play();

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [emblaApi, stopOnHover]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel */}
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div
          // className="flex"
          className={`embla__container flex gap-4 ${
            centerIfFew && slides.length <= 3 ? "justify-center" : ""
          }`}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="px-2"
              style={{
                flex: `0 0 calc(${100 / slidesToShow}% - 1rem)`,
                minWidth: "150px",
              }}
            >
              <ImageCard
                src={slide.src}
                title={slide.title}
                subTitle={slide.subTitle}
                rounded={rounded}
                ripple={ripple}
                rippleColor={rippleColor}
                rippleOpacity={rippleOpacity}
                href={slide.href} // 👈 optional href for link
                linkEnabled={slide.linkEnabled} // 👈 optional toggle
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows middle*/}
      {showNavigation && canScroll && navigationPosition === "middle" && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-secondary shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronLeft className="w-6 h-6 text-secondary-foreground" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-secondary shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronRight className="w-6 h-6 text-secondary-foreground" />
          </button>
        </>
      )}

      {/* Navigation Arrows below*/}
      {showNavigation && canScroll && navigationPosition === "below" && (
        <div className="flex justify-between gap-6 mt-4">
          <button
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            disabled={!emblaApi}
            className="bg-secondary shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronLeft className="w-6 h-6 text-secondary-foreground" />
          </button>
          <button
            onClick={() => emblaApi && emblaApi.scrollNext()}
            disabled={!emblaApi}
            className="bg-secondary shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronRight className="w-6 h-6 text-secondary-foreground" />
          </button>
        </div>
      )}

      {/* Pagination Dots */}
      {showPagination && canScroll && (
        <div
          className={`flex gap-2 mt-3 ${
            paginationPosition === "center"
              ? "absolute bottom-2 left-1/2 -translate-x-1/2"
              : "justify-center"
          }`}
        >
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === selectedIndex ? "bg-primary scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
