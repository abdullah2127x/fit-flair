"use client";

import React from "react";
import ShopHeader from "@/components/custom/shop/FilterHeader";
import ShopProducts from "@/components/custom/shop/ShowProducts";
import FilterSidebar from "@/components/custom/shop/FilterSidebar";
import { useAppSelector } from "@/redux/hooks";

const Shop = () => {
  const { isFilterOpen } = useAppSelector((state) => state.filterSidebar);

  return (
    <div className="min-h-screen container mx-auto px-4 flex gap-6">
      {/* Sidebar column */}
      {isFilterOpen && (
        <aside className="w-64 shrink-0">
          <div className="sticky overflow-x-hidden top-20 max-h-[calc(100vh-5rem)] overflow-auto">
            <FilterSidebar />
          </div>
        </aside>
      )}

      {/* Products column */}
      <main className="flex-1 flex flex-col gap-4 pb-16">
        {/* Header */}
        <div className="w-full">
          <ShopHeader />
        </div>

        {/* Products */}
        <div className="flex-1 mt-[80px]">
          <ShopProducts view="grid" />
        </div>
      </main>
    </div>
  );
};

export default Shop;
