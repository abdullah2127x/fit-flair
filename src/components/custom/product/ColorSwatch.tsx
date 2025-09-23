// components/ColorSwatch.tsx
"use client";

import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  colorName: string;
  colorCode: string;
  isSelected: boolean;
  onClick: () => void;
  inStock: boolean;
}

export default function ColorSwatch({
  colorName,
  colorCode,
  isSelected,
  onClick,
  inStock,
}: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      disabled={!inStock}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
        isSelected
          ? "border-primary bg-primary/10"
          : "border-gray-200 hover:border-gray-300",
        !inStock && "opacity-50 cursor-not-allowed"
      )}
      title={colorName}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-full border",
          !inStock && "grayscale"
        )}
        style={{ backgroundColor: colorCode }}
      />
      <span className="text-sm capitalize hidden sm:inline">
        {colorName}
      </span>
    </button>
  );
}