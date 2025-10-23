"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import FilterButton from "./FilterButton";
import FilterTopTabs from "./FilterTopTabs";

const FilterHeader = () => {
  const filterHeaderRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  // control the mobile search bar
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const scrollThreshold = 50;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      clearTimeout(scrollTimeout);

      // check scroll difference
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      if (scrollDiff > scrollThreshold) {
        if (currentScrollY > lastScrollY.current) {
          gsap.to(filterHeaderRef.current, {
            y: "-100%",
            duration: 0.4,
            opacity: 0,
            ease: "power3.out",
          });
        }
      }

      scrollTimeout = setTimeout(() => {
        gsap.to(filterHeaderRef.current, {
          y: "0%",
          duration: 0.4,
          opacity: 1,
          ease: "power3.out",
        });
      }, 100);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const mainFilters = [
    { text: "Men", key: "audience", value: "men" },
    { text: "Women", key: "audience", value: "women" },
    { text: "Unstitched", key: "categories", value: "unstitched" },
    { text: "Stitched", key: "categories", value: "stitched" },
    { text: "Ready To Wear", key: "categories", value: "readytowear" },
    { text: "Summer", key: "season", value: "summer" },
    { text: "Winter", key: "season", value: "winter" },
    { text: "Plain", key: "designs", value: "plain" },
    { text: "Printed", key: "designs", value: "printed" },
    { text: "Casual", key: "occasion", value: "casual" },
    { text: "Formal", key: "occasion", value: "formal" },
    { text: "10% Off", key: "discounts", value: "10" },
  ];

  return (
    <>
      {/* Mobile Filter Button (floating) */}
      <div className="md:hidden fixed right-4 bottom-10 z-50">
        <FilterButton view="mobile" />
      </div>
      <div
        ref={filterHeaderRef}
        className="flex items-center gap-2 py-2 w-full fixed container mx-auto bg-primary  z-40"
      >
        {/* Desktop Filter Button */}
        <div className="hidden md:block">
          <FilterButton view="desktop" />
        </div>

        {/* Scrollable Tabs */}
        <div className="flex-1 overflow-x-hidden relative">
          <FilterTopTabs items={mainFilters} />
        </div>
      </div>
    </>
  );
};

export default FilterHeader;
