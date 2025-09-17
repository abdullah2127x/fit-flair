"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Item = {
  text: string;
  value: string;
};

type FilterTopTabsProps = {
  items: Item[];
  emblaOptions?: EmblaOptionsType;
  className?: string;
};

const FilterTopTabs: React.FC<FilterTopTabsProps> = ({
  items,
  emblaOptions = { loop: false },
  className = "",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...emblaOptions,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  // ✅ Optional: mouse wheel horizontal scrolling
  useEffect(() => {
    if (!emblaApi) return;
    const node = emblaApi.rootNode();

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        if (event.deltaX > 0) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollPrev();
        }
      }
    };

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, [emblaApi]);

  return (
    <div className={`relative w-full min-w-0 ${className}`}>
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="embla__container py-1 px-2 flex gap-x-3">
          {items.map((item, i) => (
            <Button
              key={i}
              size="lg"
              className="flex-shrink-0 hover:scale-105 transition-all"
            >
              {item.text}
            </Button>
          ))}
        </div>
      </div>

      {/* ✅ Navigation Buttons */}
      {canScrollPrev && (
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute top-1/2 left-2 -translate-y-1/2 
            hover:scale-110 transition"
        >
          <ChevronLeft className="w-6 md:w-7 h-7 md:h-7 text-primary-foreground" />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute top-1/2 right-2 -translate-y-1/2 
            hover:scale-110 transition"
        >
          <ChevronRight className="w-6 md:w-7 h-7 md:h-7 text-primary-foreground" />
        </button>
      )}
    </div>
  );
};

export default FilterTopTabs;
