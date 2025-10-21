"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeSidebar } from "@/redux/slices/filterSidebarSlice";
import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";

interface Option {
  title: string;
  value: string | number;
}

interface CustomSelectProps {
  title: string;
  options: Option[];
  selectedValues: (string | number)[];
  onSelect: (value: string | number) => void;
}

function CustomSelect({
  title,
  options,
  selectedValues,
  onSelect,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <Button
        onClick={toggleOpen}
        size={"lg"}
        className="w-full flex items-center justify-between hover:bg-accent/50  rounded-lg transition-colors"
      >
        <span className="text-lg font-bold text-primary-foreground">
          {title}
        </span>

        <FaAngleDown
          size={6}
          className={` transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="flex flex-wrap gap-6 py-3 mb-4">
          {options.map((option: Option) => (
            <Button
              key={option.value}
              className=" px-6"
              variant={
                selectedValues.includes(option.value) ? "secondary" : "default"
              }
              onClick={() => onSelect(option.value)}
            >
              {option.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const { isFilterOpen, device } = useAppSelector(
    (state) => state.filterSidebar
  );

  const filterOptions = {
    audience: [
      { title: "Men", value: "men" },
      { title: "Women", value: "women" },
    ],
    categories: [
      { title: "Un Stitched", value: "unStitched" },
      { title: "Stitched", value: "stitched" },
      { title: "Ready To Wear", value: "readyToWear" },
    ],
    subCategories: [
      { title: "Top", value: "top" },
      { title: "Bottom", value: "bottom" },
      { title: "2 Piece", value: "2piece" },
      { title: "3 Piece", value: "3piece" },
    ],
    menOutfitTypes: [
      { title: "Polo Shirt", value: "polo" },
      { title: "T-Shirt", value: "tshirt" },
      { title: "Formal Shirt", value: "shirt" },
      { title: "Kurta", value: "kurta" },
      { title: "Waistcoat", value: "waistcoat" },
      { title: "Formal Suit (2 Piece)", value: "2pieceSuit" },
      { title: "Formal Suit (3 Piece)", value: "3pieceSuit" },
      { title: "Sherwani", value: "sherwani" },
      { title: "Jeans", value: "jeans" },
      { title: "Trousers / Chinos", value: "trousers" },
      { title: "Shorts", value: "shorts" },
      { title: "Tracksuit / Gym Wear", value: "tracksuit" },
    ],
    womenOutfitTypes: [
      { title: "Kurti / Shirt", value: "kurti" },
      { title: "Polo Shirt", value: "polo" },
      { title: "T-Shirt", value: "tshirt" },
      { title: "Blouse / Tunic", value: "blouse" },
      { title: "Dress / Maxi", value: "dress" },
      { title: "Gown", value: "gown" },
      { title: "Saree", value: "saree" },
      { title: "Lehenga Choli", value: "lehenga" },
      { title: "Anarkali Suit", value: "anarkali" },
      { title: "2 Piece (Kurti + Trouser)", value: "2pieceSuit" },
      { title: "3 Piece (Kurti + Trouser + Dupatta)", value: "3pieceSuit" },
      { title: "Jeans / Trousers", value: "jeansTrousers" },
      { title: "Skirt", value: "skirt" },
      { title: "Leggings / Jeggings", value: "leggings" },
      { title: "Tracksuit / Gym Wear", value: "tracksuit" },
    ],
    seasons: [
      { title: "Summer", value: "summer" },
      { title: "Winter", value: "winter" },
    ],
    designs: [
      { title: "Plain", value: "plain" },
      { title: "Printed", value: "printed" },
      { title: "Embroidered", value: "embroidered" },
      { title: "Block Print", value: "block_print" },
      { title: "Digital Print", value: "digital_print" },
      { title: "Geometric", value: "geometric" },
      { title: "Floral", value: "floral" },
      { title: "Abstract", value: "abstract" },
      { title: "Minimalist", value: "minimalist" },
    ],
    occasions: [
      { title: "Casual", value: "casual" },
      { title: "Formal", value: "formal" },
      { title: "Party / Festive", value: "party" },
      { title: "Wedding", value: "wedding" },
      { title: "Office / Workwear", value: "office" },
      { title: "Eid / Religious", value: "eid" },
    ],
    priceRanges: [
      { title: "$0 - $50", value: "$0 - $50" },
      { title: "$50 - $150", value: "$50 - $150" },
      { title: "$150+", value: "$150+" },
    ],
    discounts: [
      { title: "10% Off", value: 10 },
      { title: "20% Off", value: 20 },
      { title: "30% Off", value: 30 },
      { title: "50% Off or More", value: 50 },
    ],
  };

  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [selectedOutfitTypes, setSelectedOutfitTypes] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);

  const router = useRouter();

  const handleToggle = <T,>(
    value: T,
    setFn: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setFn((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleApply = () => {
    const filters = {
      audience: selectedAudience,
      categories: selectedCategories,
      subCategories: selectedSubCategories,
      outfitTypes: selectedOutfitTypes,
      seasons: selectedSeasons,
      designs: selectedDesigns,
      occasions: selectedOccasions,
      priceRanges: selectedPriceRanges,
      discounts: selectedDiscounts,
    };
    console.log("Applied Filters:", filters);

    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => query.append(key, v.toString()));
      }
    });

    router.push(`/shop?${query.toString()}`);
    dispatch(closeSidebar());
  };

  const handleReset = () => {
    setSelectedAudience([]);
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedOutfitTypes([]);
    setSelectedSeasons([]);
    setSelectedDesigns([]);
    setSelectedOccasions([]);
    setSelectedPriceRanges([]);
    setSelectedDiscounts([]);
  };

  const handleClose = () => dispatch(closeSidebar());

  const showMenOutfits = selectedAudience.includes("men");
  const showWomenOutfits = selectedAudience.includes("women");

  const FilterContent = () => (
    <div className="flex flex-col items-start gap-3">
      <h2 className="font-bold text-2xl text-center w-full">Filter Products</h2>

      <CustomSelect
        title="Audience"
        options={filterOptions.audience}
        selectedValues={selectedAudience}
        onSelect={(value) => handleToggle(
          value as string, 
          setSelectedAudience)}
      />

      <CustomSelect
        title="Categories"
        options={filterOptions.categories}
        selectedValues={selectedCategories}
        onSelect={(value) =>
          handleToggle(value as string, setSelectedCategories)
        }
      />

      <CustomSelect
        title="Sub Category"
        options={filterOptions.subCategories}
        selectedValues={selectedSubCategories}
        onSelect={(value) =>
          handleToggle(value as string, setSelectedSubCategories)
        }
      />

      {showMenOutfits && (
        <CustomSelect
          title="Men Outfit Type"
          options={filterOptions.menOutfitTypes}
          selectedValues={selectedOutfitTypes}
          onSelect={(value) =>
            handleToggle(value as string, setSelectedOutfitTypes)
          }
        />
      )}

      {showWomenOutfits && (
        <CustomSelect
          title="Women Outfit Type"
          options={filterOptions.womenOutfitTypes}
          selectedValues={selectedOutfitTypes}
          onSelect={(value) =>
            handleToggle(value as string, setSelectedOutfitTypes)
          }
        />
      )}

      <CustomSelect
        title="Season"
        options={filterOptions.seasons}
        selectedValues={selectedSeasons}
        onSelect={(value) => handleToggle(value as string, setSelectedSeasons)}
      />

      <CustomSelect
        title="Designs"
        options={filterOptions.designs}
        selectedValues={selectedDesigns}
        onSelect={(value) => handleToggle(value as string, setSelectedDesigns)}
      />

      <CustomSelect
        title="Occasions"
        options={filterOptions.occasions}
        selectedValues={selectedOccasions}
        onSelect={(value) =>
          handleToggle(value as string, setSelectedOccasions)
        }
      />

      <CustomSelect
        title="Price Range"
        options={filterOptions.priceRanges}
        selectedValues={selectedPriceRanges}
        onSelect={(value) =>
          handleToggle(value as string, setSelectedPriceRanges)
        }
      />

      <CustomSelect
        title="Discount"
        options={filterOptions.discounts}
        selectedValues={selectedDiscounts}
        onSelect={(value) =>
          handleToggle(value as number, setSelectedDiscounts)
        }
      />

      <div className="w-full flex gap-3 mt-4">
        <Button onClick={handleApply} className="w-full bg-pPink text-white">
          Apply
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full border-pPink text-pPink hover:bg-pPink/10"
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {device === "mobile" && (
        <Sheet open={isFilterOpen} onOpenChange={handleClose}>
          <SheetContent className="text-darkTextBlue overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-center text-center font-bold text-2xl text-darkTextBlue">
                  Filter Products
                </div>
              </SheetTitle>
              <SheetDescription>
                <div className="bg-white h-fit p-6 shadow-md text-start rounded-lg">
                  <FilterContent />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}

      {device === "desktop" && (
        <div
          className={`hidden lg:block text-secondary-foreground py-6 px-1 shadow-md rounded-lg h-screen sticky top-0    overflow-y-auto transition-all duration-700 ease-in-out ${
            isFilterOpen ? "w-80" : "w-0"
          }`}
        >
          {isFilterOpen && <FilterContent />}
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
