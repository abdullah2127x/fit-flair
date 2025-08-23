"use client";
import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import ImageCard from "./ImageCard";


type SlideType = {
  src: string;
  title?: string;
  subTitle?: string;
  href?: string;
  linkEnabled?: boolean;
};

type ContinuousCarouselProps = {
  slides: SlideType[];
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
};

const ContinuousCarousel: React.FC<ContinuousCarouselProps> = ({
  slides,
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
        stopOnInteraction: false,
      }),
    ]
  );

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
                src={slide?.src}
                title={slide?.title}
                subTitle={slide?.subTitle}
                rounded={rounded}
                ripple={ripple}
                rippleColor={rippleColor}
                rippleOpacity={rippleOpacity}
                href={slide.href}
                linkEnabled={slide.linkEnabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinuousCarousel;
