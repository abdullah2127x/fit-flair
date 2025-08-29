"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageCard from "./ImageCard";

type SlideType = {
  id: string;
  src: string;
  title: string;
  subTitle?: string;
  href?: string; // 👈 optional URL
  linkEnabled?: boolean;
};

type CarouselProps = {
  slides: SlideType[];

  slidesToShow?: number;

  autoPlay?: boolean; // continuous smooth autoplay
  autoPlaySpeed?: number;

  rounded?: "circle" | "square";

  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;

  emblaOptions?: EmblaOptionsType;
  className?: string;

  stepAutoPlay?: boolean;
  stepAutoPlayDelay?: number;

  // interactive features
  showPagination?: boolean;
  paginationPosition?: "below" | "center";

  showNavigation?: boolean;
  navigationPosition?: "middle" | "below";

  stopOnHover?: boolean;
  freeScroll?: boolean;
  centerIfFew?: boolean;
  centerScale?: boolean;

  enableMouseWheel?: boolean;
  mouseWheelDirection?: "horizontal" | "vertical" | "both";

  mouseWheelSensitivity?: number;

  direction?: "forward" | "backward";
};

const EmblaCarousel: React.FC<CarouselProps> = ({
  slides,
  slidesToShow = 6,

  autoPlay = false, // continuous smooth scroll
  autoPlaySpeed = 2,

  stepAutoPlay = false,
  stepAutoPlayDelay = 3,

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

  enableMouseWheel = true,
  mouseWheelDirection = "both",

  mouseWheelSensitivity = 1,

  direction = "forward",
}) => {
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

  // Center scale effect
  useEffect(() => {
    if (!emblaApi || !centerScale) return;

    const slides = emblaApi.slideNodes();

    const applyScale = () => {
      const viewport = emblaApi.rootNode();
      const viewportWidth = viewport.offsetWidth;
      const viewportCenter = viewportWidth / 2;

      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(viewportCenter - slideCenter);

        // Normalize distance (0 = center, 1 = far away)
        const maxDistance = viewportWidth / 2;
        const normalized = Math.min(distance / maxDistance, 1);

        // Scale calculation
        const scale = 1 - normalized * 0.3; // 👈 adjust 0.3 for intensity
        slide.style.transform = `scale(${scale})`;
        slide.style.transition = "transform 0.3s ease-out";
      });
    };

    emblaApi.on("scroll", applyScale);
    emblaApi.on("reInit", applyScale);

    applyScale(); // initial

    return () => {
      emblaApi.off("scroll", applyScale);
      emblaApi.off("reInit", applyScale);
    };
  }, [emblaApi, centerScale]);

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
  }, [emblaApi, enableMouseWheel, mouseWheelSensitivity]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Mouse wheel hint */}
      {enableMouseWheel && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-black/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
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
                id={slide.title}
                src={slide.src}
                title={slide.title}
                href={slide.href}
                subTitle={slide.subTitle}
                rounded={rounded}
                ripple={ripple}
                rippleColor={rippleColor}
                rippleOpacity={rippleOpacity}
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
