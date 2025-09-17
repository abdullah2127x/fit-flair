"use client";

import React from "react";
import FilterButton from "./FilterButton";
import FilterTopTabs from "./FilterTopTabs";

const FilterHeader = () => {
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
    <div className="flex items-center gap-2 py-2 w-full relative">
      {/* Desktop Filter Button */}
      <div className="hidden md:block">
        <FilterButton view="desktop" />
      </div>

      {/* Mobile Filter Button (floating) */}
      <div className="md:hidden fixed bottom-10 right-4 z-50">
        <FilterButton view="mobile" />
      </div>

      {/* Scrollable Tabs */}
      <div className="flex-1 overflow-x-hidden relative">
        <FilterTopTabs items={items} />
      </div>
    </div>
  );
};

export default FilterHeader;
