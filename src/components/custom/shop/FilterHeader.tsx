// "use client";

// import React from "react";
// import FilterButton from "./FilterButton";
// import FilterTopTabs from "./FilterTopTabs";

// const FilterHeader = () => {
//   const items = [
//     { text: "Option 1", value: "1" },
//     { text: "Option 2", value: "2" },
//     { text: "Option 3", value: "3" },
//     { text: "Option 4", value: "4" },
//     { text: "Option 1", value: "1" },
//     { text: "Option 2", value: "2" },
//     { text: "Option 3", value: "3" },
//     { text: "Option 4", value: "4" },
//     { text: "Option 1", value: "1" },
//     { text: "Option 2", value: "2" },
//     { text: "Option 3", value: "3" },
//     { text: "Option 4", value: "4" },
//     { text: "Option 1", value: "1" },
//     { text: "Option 2", value: "2" },
//     { text: "Option 3", value: "3" },
//     { text: "Option 4", value: "4" },
//     { text: "Option 1", value: "1" },
//     { text: "Option 2", value: "2" },
//     { text: "Option 3", value: "3" },
//     { text: "Option 4", value: "4" },
//   ];

//   return (
//     <div className="flex items-center gap-2 py-2 w-full fixed container mx-auto bg-primary  z-40">
//       {/* Desktop Filter Button */}
//       <div className="hidden md:block">
//         <FilterButton view="desktop" />
//       </div>

//       {/* Mobile Filter Button (floating) */}
//       <div className="md:hidden fixed bottom-10 right-4 z-50">
//         <FilterButton view="mobile" />
//       </div>

//       {/* Scrollable Tabs */}
//       <div className="flex-1 overflow-x-hidden relative">
//         <FilterTopTabs items={items} />
//       </div>
//     </div>
//   );
// };

// export default FilterHeader;

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

  const items = [
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" },
    { text: "Option 3", value: "3" },
    { text: "Option 4", value: "4" },
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" },
    { text: "Option 3", value: "3" },
    { text: "Option 4", value: "4" },
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" },
    { text: "Option 3", value: "3" },
    { text: "Option 4", value: "4" },
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" },
    { text: "Option 3", value: "3" },
    { text: "Option 4", value: "4" },
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" },
    { text: "Option 3", value: "3" },
    { text: "Option 4", value: "4" },
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
          <FilterTopTabs items={items} />
        </div>
      </div>
    </>
  );
};

export default FilterHeader;
