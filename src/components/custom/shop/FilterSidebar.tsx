// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { closeSidebar } from "@/redux/slices/filterSidebarSlice";

// const FilterSidebar = () => {
//   const dispatch = useAppDispatch();
//   const { isFilterOpen, device } = useAppSelector(
//     (state) => state.filterSidebar
//   );

//   const handleApply = () => {
//     dispatch(closeSidebar());
//   };
//   const handleClose = () => {
//     dispatch(closeSidebar());
//   };

//   return (
//     <>
//       {/* ✅ Mobile: Sheet */}
//       {device === "mobile" && (
//         <div className="lg:hidden">
//           <Sheet open={isFilterOpen} onOpenChange={handleClose}>
//             <SheetContent
//               side="left"
//               className="w-64 bg-primary text-primary-foreground p-4"
//             >
//               <SheetHeader>
//                 <SheetTitle>Clothing Filters</SheetTitle>
//               </SheetHeader>

//               <div className="space-y-2 mt-4">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" /> Shirts
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" /> Pants
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" /> Jackets
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" /> Shoes
//                 </label>
//               </div>

//               <div className="mt-6 flex gap-2">
//                 <Button
//                   variant="secondary"
//                   className="w-full"
//                   onClick={handleApply}
//                 >
//                   Apply
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full text-primary-foreground border-primary-foreground"
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       )}

//       {/* ✅ Desktop: Static Sidebar */}
//       {device === "desktop" && isFilterOpen && (
//         <div
//           // className="hidden lg:block w-64 bg-primary text-primary-foreground p-4 h-screen sticky top-0  transition-all duration-300 ease-in-out overflow-hidden"
//           className={`hidden lg:block bg-primary text-primary-foreground p-4 h-screen   sticky top-0 transition-all duration-1000 ease-in-out overflow-hidden
//             ${isFilterOpen ? "w-64" : "w-0"}
//           `}
//         >
//           <h2 className="font-semibold text-lg mb-4">Clothing Filters</h2>

//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shirts
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Pants
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Jackets
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shoes
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shirts
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Pants
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Jackets
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shoes
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shirts
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Pants
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Jackets
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shoes
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shirts
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Pants
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Jackets
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shoes
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shirts
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Pants
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Jackets
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> Shoes
//             </label>
//           </div>

//           <div className="mt-6 flex gap-2">
//             <Button
//               onClick={handleApply}
//               variant="secondary"
//               className="w-full"
//             >
//               Apply
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full text-primary-foreground border-primary-foreground"
//             >
//               Reset
//             </Button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FilterSidebar;

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

// Simple underline heading, same as before
const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h5 className="text-[20px] font-semibold text-darkTextBlue underline underline-offset-4">
      {children}
    </h5>
  );
};

const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const { isFilterOpen, device } = useAppSelector(
    (state) => state.filterSidebar
  );

  // Example filters (you can replace with your actual ones)
  const filterOptions = {
    categories: ["Shirts", "Pants", "Jackets", "Shoes"],
    brands: ["Zara", "Nike", "Adidas", "Levis"],
    priceRanges: ["$0 - $50", "$50 - $150", "$150+"],
    ratings: [5, 4, 3, 2, 1],
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

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
    // Collect filters
    const filters = {
      categories: selectedCategories,
      brands: selectedBrands,
      priceRanges: selectedPriceRanges,
      ratings: selectedRatings,
    };
    console.log("Applied Filters:", filters);
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => query.append(key, v.toString()));
      }
    });
    console.log("the query to string is :",query , "and ", query.toString)

    router.push(`/shop?${query.toString()}`);

    dispatch(closeSidebar());
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
  };

  const handleClose = () => dispatch(closeSidebar());

  return (
    <>
      {/* ✅ Mobile View - Uses Sheet */}
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
                <div className="bg-white h-fit p-6 shadow-md text-start rounded-lg flex flex-col items-start gap-10">
                  {/* Categories */}
                  <div className="flex flex-col gap-4">
                    <Heading>Categories</Heading>
                    <ul className="flex flex-col gap-2">
                      {filterOptions.categories.map((c) => (
                        <li key={c}>
                          <input
                            type="checkbox"
                            className="accent-pPink size-4 cursor-pointer"
                            checked={selectedCategories.includes(c)}
                            onChange={() =>
                              handleToggle(c, setSelectedCategories)
                            }
                          />{" "}
                          <label className="text-subText cursor-pointer">
                            {c}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Brand */}
                  <div className="flex flex-col gap-4">
                    <Heading>Brand</Heading>
                    <ul className="flex flex-col gap-2">
                      {filterOptions.brands.map((b) => (
                        <li key={b}>
                          <input
                            type="checkbox"
                            className="accent-purple-400 size-4 cursor-pointer"
                            checked={selectedBrands.includes(b)}
                            onChange={() => handleToggle(b, setSelectedBrands)}
                          />{" "}
                          <label className="text-subText cursor-pointer">
                            {b}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-4">
                    <Heading>Price Range</Heading>
                    <ul className="flex flex-col gap-2">
                      {filterOptions.priceRanges.map((p) => (
                        <li key={p}>
                          <input
                            type="checkbox"
                            className="accent-pPink size-4 cursor-pointer"
                            checked={selectedPriceRanges.includes(p)}
                            onChange={() =>
                              handleToggle(p, setSelectedPriceRanges)
                            }
                          />{" "}
                          <label className="text-subText cursor-pointer">
                            {p}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col gap-4">
                    <Heading>Rating</Heading>
                    {filterOptions.ratings.map((stars) => (
                      <div key={stars} className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          className="size-4 accent-yellow-300 cursor-pointer"
                          checked={selectedRatings.includes(stars)}
                          onChange={() =>
                            handleToggle(stars, setSelectedRatings)
                          }
                        />
                        <div
                          className="flex space-x-1 cursor-pointer"
                          onClick={() =>
                            handleToggle(stars, setSelectedRatings)
                          }
                        >
                          {[...Array(stars)].map((_, i) => (
                            <span key={i} className="text-yellow-500">
                              ★
                            </span>
                          ))}
                          {[...Array(5 - stars)].map((_, i) => (
                            <span key={i} className="text-subText">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="w-full flex gap-3">
                    <Button
                      onClick={handleApply}
                      className="w-full bg-pPink text-white"
                    >
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
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}

      {/* ✅ Desktop View - Static Sidebar */}
      {device === "desktop" && (
        <div
          className={`hidden lg:block text-darkTextBlue bg-white p-6 shadow-md rounded-lg h-screen sticky top-0 overflow-y-auto transition-all duration-700 ease-in-out ${
            isFilterOpen ? "w-72" : "w-0"
          }`}
        >
          {isFilterOpen && (
            <div className="flex flex-col items-start gap-10">
              <h2 className="font-bold text-2xl text-center w-full">
                Filter Products
              </h2>

              {/* Categories */}
              <div className="flex flex-col gap-4">
                <Heading>Categories</Heading>
                <ul className="flex flex-col gap-2">
                  {filterOptions.categories.map((c) => (
                    <li key={c}>
                      <input
                        type="checkbox"
                        className="accent-pPink size-4 cursor-pointer"
                        checked={selectedCategories.includes(c)}
                        onChange={() => handleToggle(c, setSelectedCategories)}
                      />{" "}
                      <label className="text-subText cursor-pointer">{c}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-4">
                <Heading>Brand</Heading>
                <ul className="flex flex-col gap-2">
                  {filterOptions.brands.map((b) => (
                    <li key={b}>
                      <input
                        type="checkbox"
                        className="accent-purple-400 size-4 cursor-pointer"
                        checked={selectedBrands.includes(b)}
                        onChange={() => handleToggle(b, setSelectedBrands)}
                      />{" "}
                      <label className="text-subText cursor-pointer">{b}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-4">
                <Heading>Price Range</Heading>
                <ul className="flex flex-col gap-2">
                  {filterOptions.priceRanges.map((p) => (
                    <li key={p}>
                      <input
                        type="checkbox"
                        className="accent-pPink size-4 cursor-pointer"
                        checked={selectedPriceRanges.includes(p)}
                        onChange={() => handleToggle(p, setSelectedPriceRanges)}
                      />{" "}
                      <label className="text-subText cursor-pointer">{p}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-4">
                <Heading>Rating</Heading>
                {filterOptions.ratings.map((stars) => (
                  <div key={stars} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="size-4 accent-yellow-300 cursor-pointer"
                      checked={selectedRatings.includes(stars)}
                      onChange={() => handleToggle(stars, setSelectedRatings)}
                    />
                    <div
                      className="flex space-x-1 cursor-pointer"
                      onClick={() => handleToggle(stars, setSelectedRatings)}
                    >
                      {[...Array(stars)].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                      {[...Array(5 - stars)].map((_, i) => (
                        <span key={i} className="text-subText">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="w-full flex gap-3">
                <Button
                  onClick={handleApply}
                  className="w-full bg-pPink text-white"
                >
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
          )}
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
