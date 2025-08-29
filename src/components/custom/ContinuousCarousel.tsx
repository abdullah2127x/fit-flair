"use client";
import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import ImageCard from "./ImageCard";

type SlideType = {
  src: string;
  title: string;
  subTitle?: string;
  href?: string;
  linkEnabled?: boolean;
};

type ContinuousCarouselProps = {
  slides: SlideType[];
  showAddToCart?: boolean;
  buttonText?: string;
  slidesToShow?: number;
  autoPlaySpeed?: number;
  stopOnHover?: boolean;
  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  emblaOptions?: EmblaOptionsType;
  className?: string;
  centerIfFew?: boolean;
  enableMouseWheel?: boolean; // 🆕 Enable/disable mouse wheel scrolling
  mouseWheelDirection?: "horizontal" | "vertical" | "both";
  mouseWheelSensitivity?: number; // 🆕 Control mouse wheel sensitivity (default: 1)
  direction?: "forward" | "backward";
};

const ContinuousCarousel: React.FC<ContinuousCarouselProps> = ({
  slides,
  showAddToCart,
  buttonText,
  slidesToShow = 6,
  autoPlaySpeed = 2,
  stopOnHover = true,
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  emblaOptions = { loop: true },
  className = "",
  centerIfFew = true,
  enableMouseWheel = true, // 🆕 Default to enabled
  mouseWheelDirection = "horizontal",
  mouseWheelSensitivity = 1, // 🆕 Default sensitivity
  direction = "forward",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...emblaOptions,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: autoPlaySpeed,
        direction: direction,
        stopOnInteraction: false,
      }),
    ]
  );

  // autoplay hover stop (with auto resume after delay)
  useEffect(() => {
    if (!emblaApi || !stopOnHover) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (!autoScroll) return;

    const node = emblaApi.rootNode();
    let resumeTimeout: NodeJS.Timeout;

    const handleMouseEnter = () => {
      autoScroll.stop();

      // ⏳ auto resume after 5 seconds even if still hovered
      resumeTimeout = setTimeout(() => {
        autoScroll.play();
      }, 5000);
    };

    const handleMouseLeave = () => {
      clearTimeout(resumeTimeout); // cancel pending auto-resume
      autoScroll.play(); // resume immediately
    };

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(resumeTimeout);
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [emblaApi, stopOnHover]);

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
                src={slide?.src}
                title={slide?.title}
                subTitle={slide?.subTitle}
                rounded={rounded}
                ripple={ripple}
                rippleColor={rippleColor}
                rippleOpacity={rippleOpacity}
                href={slide.href}
                showAddToCart={showAddToCart}
                buttonText={buttonText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinuousCarousel;
