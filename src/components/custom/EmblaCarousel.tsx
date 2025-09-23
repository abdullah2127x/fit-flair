"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageCard from "./ImageCard";
import {
  ProductCollectionSchema,
  ProductShowcaseSchema,
} from "@/types/product";
import { Button } from "../ui/button";
import QuickViewDialog from "./QuickViewDialog";
import SkeletonImageCard from "./skeletons/SkeletonImageCard";
type CollectionSlides = {
  variant: "collection";
  slides: ProductCollectionSchema[];
};

type ShowcaseSlides = {
  variant: "showcase";
  slides: ProductShowcaseSchema[];
};

// 🔹 General carousel props (apply to all variants)
type CarouselSharedProps = {
  slidesToShow?: number;
  loading?: boolean; // 👈 new
  skeletonCount?: number; // 👈 optional skeleton count
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  rounded?: "circle" | "square";
  emblaOptions?: EmblaOptionsType;
  className?: string;

  stepAutoPlay?: boolean;
  stepAutoPlayDelay?: number;

  buttonText?: string;

  showPagination?: boolean;
  paginationPosition?: "below" | "center";

  showNavigation?: boolean;
  navigationPosition?: "middle" | "below";

  stopOnHover?: boolean;
  freeScroll?: boolean;
  centerIfFew?: boolean;

  enableMouseWheel?: boolean;
  mouseWheelDirection?: "horizontal" | "vertical" | "both";
  mouseWheelSensitivity?: number;

  changeColorOnHover?: boolean;
  direction?: "forward" | "backward";
};

// 🔹 Union of variants + shared props
export type CarouselProps =
  | (CollectionSlides & CarouselSharedProps)
  | (ShowcaseSlides & CarouselSharedProps);

const EmblaCarousel: React.FC<CarouselProps> = (props) => {
  const {
    slides,
    // variant,
    variant = "showcase",
    slidesToShow = 6,
    changeColorOnHover = false,
    rounded = "circle",

    loading = false,
    skeletonCount = 4,

    ///////////////////////
    autoPlay = false, // continuous smooth scroll
    autoPlaySpeed = 2,

    stepAutoPlay = false,
    stepAutoPlayDelay = 3,

    buttonText,
    emblaOptions = { loop: true },
    className = "",

    showPagination = false,
    paginationPosition = "below",

    showNavigation = false,
    navigationPosition = "middle",

    stopOnHover = true,
    freeScroll = true,
    centerIfFew = true,

    enableMouseWheel = true,
    mouseWheelDirection = "both",

    mouseWheelSensitivity = 1,

    direction = "forward",
  } = props;

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null
  );

  const handleQuickView = (id: string, colorName: string) => {
    setSelectedColorName(colorName);
    setSelectedProductId(id);
    setIsQuickViewOpen(true);
  };

  // ✅ Track window width safely
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...emblaOptions,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: freeScroll,
    },
    autoPlay && !stepAutoPlay
      ? [
          AutoScroll({
            playOnInit: false,
            speed: autoPlaySpeed,
            direction: direction,
            stopOnInteraction: false,
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
    setCanScroll(snaps.length > 1 && slides.length > slidesToShow);
  }, [emblaApi, slidesToShow]);

  // show and hide the scrollbar if more slides are available
  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", checkCanScroll);
    emblaApi.on("resize", checkCanScroll);

    checkCanScroll();
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", checkCanScroll);
      emblaApi.off("resize", checkCanScroll);
    };
  }, [emblaApi, onSelect, checkCanScroll]);

  // step autoplay (slide by slide with loop)
  useEffect(() => {
    if (!emblaApi || !stepAutoPlay) return;
    if (slides.length <= 1) return; // 👈 don’t autoplay single slide

    let interval: NodeJS.Timeout;

    const play = () => {
      if (direction === "forward") {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollPrev();
      }
    };

    interval = setInterval(play, stepAutoPlayDelay * 1000);

    return () => clearInterval(interval);
  }, [emblaApi, stepAutoPlay, stepAutoPlayDelay, direction, slides.length]);

  // autoplay hover stop (only for continuous mode)
  useEffect(() => {
    if (!emblaApi || !stopOnHover || !autoPlay || stepAutoPlay) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (!autoScroll) return;

    const node = emblaApi.rootNode();
    let resumeTimeout: NodeJS.Timeout;

    const handleMouseEnter = () => {
      autoScroll.stop();
      // after 5 seconds, resume even if still hovered
      resumeTimeout = setTimeout(() => {
        autoScroll.play();
      }, 5000);
    };

    const handleMouseLeave = () => {
      clearTimeout(resumeTimeout);
      autoScroll.play();
    };

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    // start autoplay initially
    setTimeout(() => {
      autoScroll.play();
    }, 1000);

    return () => {
      clearTimeout(resumeTimeout);
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [emblaApi, stopOnHover, autoPlay, stepAutoPlay]);

  // Mouse wheel support for horizontal and vertical scrolling
  useEffect(() => {
    if (!emblaApi || !enableMouseWheel) return;

    const node = emblaApi.rootNode();
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;

      let delta = 0;

      if (mouseWheelDirection === "horizontal") {
        // Only preventDefault when user is scrolling horizontally
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          event.preventDefault(); // stop body scroll only for horizontal
          delta = event.deltaX;
        } else {
          // If user scrolls vertically, let body scroll normally
          return;
        }
      } else if (mouseWheelDirection === "vertical") {
        event.preventDefault(); // block Y scroll → control carousel
        delta = event.deltaY;
      } else {
        // "both"
        event.preventDefault();
        delta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY;
      }

      const threshold = 50 / mouseWheelSensitivity;
      if (Math.abs(delta) > threshold) {
        if (delta > 0) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollPrev();
        }

        wheelTimeout = setTimeout(() => {}, 100);
      }
    };

    // Add wheel event listener
    node.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      node.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [mouseWheelDirection, emblaApi, enableMouseWheel, mouseWheelSensitivity]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Mouse wheel hint */}
      {enableMouseWheel && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-secondary/20 text-secondary-foreground text-xs px-2 py-1 rounded-full backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
            🖱️ Use mouse wheel to scroll
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div
          className={`embla__container flex gap-4 ${
            centerIfFew && slides.length <= 3 ? "justify-center" : ""
          }`}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => {
                const itemsToShow =
                  windowWidth !== null && windowWidth < 768 ? 1 : slidesToShow;

                return (
                  <div
                    key={i}
                    className="px-2"
                    style={{
                      flex: `0 0 calc(${100 / itemsToShow}% - 1rem)`,
                    }}
                  >
                    <SkeletonImageCard tags={3} />
                  </div>
                );
              })
            : variant === "collection"
              ? (slides as ProductCollectionSchema[]).map((slide) => {
                  const itemsToShow =
                    windowWidth !== null && windowWidth < 768
                      ? 1
                      : slidesToShow;
                  return (
                    <div
                      key={slide.id}
                      className="px-2"
                      style={{
                        flex: `0 0 calc(${100 / itemsToShow}% - 1rem)`,
                      }}
                    >
                      <ImageCard
                        variant="collection"
                        id={slide.id}
                        src={slide.src}
                        slug={slide.slug}
                        title={slide.title}
                        rounded={rounded}
                        changeColorOnHover={changeColorOnHover}
                        buttonText="Show More"
                      />
                    </div>
                  );
                })
              : variant === "showcase"
                ? (slides as ProductShowcaseSchema[]).map((slide) => {
                    const itemsToShow =
                      windowWidth !== null && windowWidth < 768
                        ? 1
                        : slidesToShow;
                    return (
                      <div
                        key={slide.id}
                        className="px-2"
                        style={{
                          flex: `0 0 calc(${100 / itemsToShow}% - 1rem)`,
                        }}
                      >
                        <ImageCard
                          id={slide.id.toString()}
                          variant="showcase"
                          src={slide.src}
                          slug={slide.slug}
                          title={slide.title}
                          subTitle={slide.subTitle}
                          price={slide.price}
                          discount={slide.discount}
                          colorName={slide.colorName}
                          tags={slide.tags}
                          rounded={rounded}
                          changeColorOnHover={changeColorOnHover}
                          showAddToCart={true}
                          showQuickView={true}
                          onQuickView={handleQuickView}
                          buttonText={buttonText}
                        />
                      </div>
                    );
                  })
                : null}
        </div>
      </div>

      {/* Navigation Arrows middle*/}
      {showNavigation && canScroll && navigationPosition === "middle" && (
        <>
          <Button
            variant="default"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute aspect-square bg-secondary  top-1/2 left-4 -translate-y-1/2 shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronLeft className="w-6 h-6 text-secondary-foreground" />
          </Button>
          <Button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute top-1/2 right-4 bg-secondary aspect-square -translate-y-1/2 shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronRight className="w-6 h-6 text-secondary-foreground" />
          </Button>
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
                i === selectedIndex
                  ? "bg-primary-foreground scale-125"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {selectedProductId && selectedColorName && (
        <QuickViewDialog
          isOpen={isQuickViewOpen}
          onOpenChange={(open) => {
            setIsQuickViewOpen(open);
            if (!open) {
              setSelectedProductId(null);
              setSelectedColorName(null);
            }
          }}
          productId={selectedProductId}
          colorName={selectedColorName}
        />
      )}
    </div>
  );
};

export default EmblaCarousel;
