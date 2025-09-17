"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 using shadcn/ui skeleton

type SkeletonImageCardProps = {
  rounded?: "circle" | "square";
  aspectRatio?: "square" | "h-full";
  showAddToCart?: boolean;
  showQuickView?: boolean;
  tags?: number; // 👈 how many fake tags to render
};

const SkeletonImageCard: React.FC<SkeletonImageCardProps> = ({ tags = 3 }) => {
  return (
    <div
      className={`flex bg-secondary/20 rounded-lg flex-col items-center h-full relative`}
    >
      {/* image placeholder */}
      <div className={` w-full bg-secondary rounded-lg aspect-square `}>
        <Skeleton className="w-full h-full" />
      </div>

      {/* buttons for mobile */}
      <div className="flex gap-1 mt-2 md:hidden w-full">
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>

      {/* text placeholders */}
      <div className="flex flex-1 flex-col gap-2 justify-between py-3  w-full">
        {/* title */}
        <Skeleton className="h-6 w-3/4  bg-primary-foreground/20 ml-4 rounded" />

        {/* subtitle */}
        <Skeleton className="h-4 w-1/2 ml-4 bg-primary-foreground/20 rounded" />

        {/* price and color */}
        <div className="flex items-center justify-between px-4 mt-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>

        {/* tags */}
        <div className="flex  flex-wrap gap-1 px-3 mt-2">
          {Array.from({ length: tags }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-12 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonImageCard;
