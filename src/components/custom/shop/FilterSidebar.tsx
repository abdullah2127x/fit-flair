// "use client";

// import React, { useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { closeSidebar } from "@/redux/slices/filterSidebarSlice";
// import { useRouter } from "next/navigation";

// // Simple underline heading, same as before
// const Heading = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <h5 className="text-[20px] font-semibold text-darkTextBlue underline underline-offset-4">
//       {children}
//     </h5>
//   );
// };

// const FilterSidebar = () => {
//   const dispatch = useAppDispatch();
//   const { isFilterOpen, device } = useAppSelector(
//     (state) => state.filterSidebar
//   );

//   // Example filters (you can replace with your actual ones)
//   const filterOptions = {
//     categories: ["Shirts", "Pants", "Jackets", "Shoes"],
//     brands: ["Zara", "Nike", "Adidas", "Levis"],
//     priceRanges: ["$0 - $50", "$50 - $150", "$150+"],
//     ratings: [5, 4, 3, 2, 1],
//   };

//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

//   const router = useRouter();

//   const handleToggle = <T,>(
//     value: T,
//     setFn: React.Dispatch<React.SetStateAction<T[]>>
//   ) => {
//     setFn((prev) =>
//       prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
//     );
//   };

//   const handleApply = () => {
//     // Collect filters
//     const filters = {
//       categories: selectedCategories,
//       brands: selectedBrands,
//       priceRanges: selectedPriceRanges,
//       ratings: selectedRatings,
//     };
//     console.log("Applied Filters:", filters);
//     const query = new URLSearchParams();
//     Object.entries(filters).forEach(([key, value]) => {
//       if (Array.isArray(value) && value.length > 0) {
//         value.forEach((v) => query.append(key, v.toString()));
//       }
//     });
//     console.log("the query to string is :",query , "and ", query.toString)

//     router.push(`/shop?${query.toString()}`);

//     dispatch(closeSidebar());
//   };

//   const handleReset = () => {
//     setSelectedCategories([]);
//     setSelectedBrands([]);
//     setSelectedPriceRanges([]);
//     setSelectedRatings([]);
//   };

//   const handleClose = () => dispatch(closeSidebar());

//   return (
//     <>
//       {/* ✅ Mobile View - Uses Sheet */}
//       {device === "mobile" && (
//         <Sheet open={isFilterOpen} onOpenChange={handleClose}>
//           <SheetContent className="text-darkTextBlue overflow-y-auto">
//             <SheetHeader>
//               <SheetTitle>
//                 <div className="flex justify-center text-center font-bold text-2xl text-darkTextBlue">
//                   Filter Products
//                 </div>
//               </SheetTitle>
//               <SheetDescription>
//                 <div className="bg-white h-fit p-6 shadow-md text-start rounded-lg flex flex-col items-start gap-10">
//                   {/* Categories */}
//                   <div className="flex flex-col gap-4">
//                     <Heading>Categories</Heading>
//                     <ul className="flex flex-col gap-2">
//                       {filterOptions.categories.map((c) => (
//                         <li key={c}>
//                           <input
//                             type="checkbox"
//                             className="accent-pPink size-4 cursor-pointer"
//                             checked={selectedCategories.includes(c)}
//                             onChange={() =>
//                               handleToggle(c, setSelectedCategories)
//                             }
//                           />{" "}
//                           <label className="text-subText cursor-pointer">
//                             {c}
//                           </label>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Brand */}
//                   <div className="flex flex-col gap-4">
//                     <Heading>Brand</Heading>
//                     <ul className="flex flex-col gap-2">
//                       {filterOptions.brands.map((b) => (
//                         <li key={b}>
//                           <input
//                             type="checkbox"
//                             className="accent-purple-400 size-4 cursor-pointer"
//                             checked={selectedBrands.includes(b)}
//                             onChange={() => handleToggle(b, setSelectedBrands)}
//                           />{" "}
//                           <label className="text-subText cursor-pointer">
//                             {b}
//                           </label>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Price */}
//                   <div className="flex flex-col gap-4">
//                     <Heading>Price Range</Heading>
//                     <ul className="flex flex-col gap-2">
//                       {filterOptions.priceRanges.map((p) => (
//                         <li key={p}>
//                           <input
//                             type="checkbox"
//                             className="accent-pPink size-4 cursor-pointer"
//                             checked={selectedPriceRanges.includes(p)}
//                             onChange={() =>
//                               handleToggle(p, setSelectedPriceRanges)
//                             }
//                           />{" "}
//                           <label className="text-subText cursor-pointer">
//                             {p}
//                           </label>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex flex-col gap-4">
//                     <Heading>Rating</Heading>
//                     {filterOptions.ratings.map((stars) => (
//                       <div key={stars} className="flex gap-2 items-center">
//                         <input
//                           type="checkbox"
//                           className="size-4 accent-yellow-300 cursor-pointer"
//                           checked={selectedRatings.includes(stars)}
//                           onChange={() =>
//                             handleToggle(stars, setSelectedRatings)
//                           }
//                         />
//                         <div
//                           className="flex space-x-1 cursor-pointer"
//                           onClick={() =>
//                             handleToggle(stars, setSelectedRatings)
//                           }
//                         >
//                           {[...Array(stars)].map((_, i) => (
//                             <span key={i} className="text-yellow-500">
//                               ★
//                             </span>
//                           ))}
//                           {[...Array(5 - stars)].map((_, i) => (
//                             <span key={i} className="text-subText">
//                               ★
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Buttons */}
//                   <div className="w-full flex gap-3">
//                     <Button
//                       onClick={handleApply}
//                       className="w-full bg-pPink text-white"
//                     >
//                       Apply
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={handleReset}
//                       className="w-full border-pPink text-pPink hover:bg-pPink/10"
//                     >
//                       Reset
//                     </Button>
//                   </div>
//                 </div>
//               </SheetDescription>
//             </SheetHeader>
//           </SheetContent>
//         </Sheet>
//       )}

//       {/* ✅ Desktop View - Static Sidebar */}
//       {device === "desktop" && (
//         <div
//           className={`hidden lg:block text-darkTextBlue bg-white p-6 shadow-md rounded-lg h-screen sticky top-0 overflow-y-auto transition-all duration-700 ease-in-out ${
//             isFilterOpen ? "w-72" : "w-0"
//           }`}
//         >
//           {isFilterOpen && (
//             <div className="flex flex-col items-start gap-10">
//               <h2 className="font-bold text-2xl text-center w-full">
//                 Filter Products
//               </h2>

//               {/* Categories */}
//               <div className="flex flex-col gap-4">
//                 <Heading>Categories</Heading>
//                 <ul className="flex flex-col gap-2">
//                   {filterOptions.categories.map((c) => (
//                     <li key={c}>
//                       <input
//                         type="checkbox"
//                         className="accent-pPink size-4 cursor-pointer"
//                         checked={selectedCategories.includes(c)}
//                         onChange={() => handleToggle(c, setSelectedCategories)}
//                       />{" "}
//                       <label className="text-subText cursor-pointer">{c}</label>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Brand */}
//               <div className="flex flex-col gap-4">
//                 <Heading>Brand</Heading>
//                 <ul className="flex flex-col gap-2">
//                   {filterOptions.brands.map((b) => (
//                     <li key={b}>
//                       <input
//                         type="checkbox"
//                         className="accent-purple-400 size-4 cursor-pointer"
//                         checked={selectedBrands.includes(b)}
//                         onChange={() => handleToggle(b, setSelectedBrands)}
//                       />{" "}
//                       <label className="text-subText cursor-pointer">{b}</label>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Price */}
//               <div className="flex flex-col gap-4">
//                 <Heading>Price Range</Heading>
//                 <ul className="flex flex-col gap-2">
//                   {filterOptions.priceRanges.map((p) => (
//                     <li key={p}>
//                       <input
//                         type="checkbox"
//                         className="accent-pPink size-4 cursor-pointer"
//                         checked={selectedPriceRanges.includes(p)}
//                         onChange={() => handleToggle(p, setSelectedPriceRanges)}
//                       />{" "}
//                       <label className="text-subText cursor-pointer">{p}</label>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Rating */}
//               <div className="flex flex-col gap-4">
//                 <Heading>Rating</Heading>
//                 {filterOptions.ratings.map((stars) => (
//                   <div key={stars} className="flex gap-2 items-center">
//                     <input
//                       type="checkbox"
//                       className="size-4 accent-yellow-300 cursor-pointer"
//                       checked={selectedRatings.includes(stars)}
//                       onChange={() => handleToggle(stars, setSelectedRatings)}
//                     />
//                     <div
//                       className="flex space-x-1 cursor-pointer"
//                       onClick={() => handleToggle(stars, setSelectedRatings)}
//                     >
//                       {[...Array(stars)].map((_, i) => (
//                         <span key={i} className="text-yellow-500">
//                           ★
//                         </span>
//                       ))}
//                       {[...Array(5 - stars)].map((_, i) => (
//                         <span key={i} className="text-subText">
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Buttons */}
//               <div className="w-full flex gap-3">
//                 <Button
//                   onClick={handleApply}
//                   className="w-full bg-pPink text-white"
//                 >
//                   Apply
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={handleReset}
//                   className="w-full border-pPink text-pPink hover:bg-pPink/10"
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </div>
//           )}
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

  // ✅ Filter options matching your Sanity schema
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
    priceRanges: ["$0 - $50", "$50 - $150", "$150+"],
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

  // ✅ Determine which outfit types to show based on selected audience
  const showMenOutfits = selectedAudience.includes("men");
  const showWomenOutfits = selectedAudience.includes("women");

  const FilterContent = () => (
    <div className="flex flex-col items-start gap-10">
      <h2 className="font-bold text-2xl text-center w-full">
        Filter Products
      </h2>

      {/* Audience */}
      <div className="flex flex-col gap-4">
        <Heading>Audience</Heading>
        <ul className="flex flex-col gap-2">
          {filterOptions.audience.map((a) => (
            <li key={a.value}>
              <input
                type="checkbox"
                className="accent-pPink size-4 cursor-pointer"
                checked={selectedAudience.includes(a.value)}
                onChange={() => handleToggle(a.value, setSelectedAudience)}
              />{" "}
              <label className="text-subText cursor-pointer">{a.title}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-4">
        <Heading>Categories</Heading>
        <ul className="flex flex-col gap-2">
          {filterOptions.categories.map((c) => (
            <li key={c.value}>
              <input
                type="checkbox"
                className="accent-pPink size-4 cursor-pointer"
                checked={selectedCategories.includes(c.value)}
                onChange={() => handleToggle(c.value, setSelectedCategories)}
              />{" "}
              <label className="text-subText cursor-pointer">{c.title}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Sub Categories */}
      <div className="flex flex-col gap-4">
        <Heading>Sub Category</Heading>
        <ul className="flex flex-col gap-2">
          {filterOptions.subCategories.map((sc) => (
            <li key={sc.value}>
              <input
                type="checkbox"
                className="accent-pPink size-4 cursor-pointer"
                checked={selectedSubCategories.includes(sc.value)}
                onChange={() =>
                  handleToggle(sc.value, setSelectedSubCategories)
                }
              />{" "}
              <label className="text-subText cursor-pointer">{sc.title}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Men Outfit Types */}
      {showMenOutfits && (
        <div className="flex flex-col gap-4">
          <Heading>Men Outfit Type</Heading>
          <ul className="flex flex-col gap-2">
            {filterOptions.menOutfitTypes.map((ot) => (
              <li key={ot.value}>
                <input
                  type="checkbox"
                  className="accent-pPink size-4 cursor-pointer"
                  checked={selectedOutfitTypes.includes(ot.value)}
                  onChange={() => handleToggle(ot.value, setSelectedOutfitTypes)}
                />{" "}
                <label className="text-subText cursor-pointer">{ot.title}</label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Women Outfit Types */}
      {showWomenOutfits && (
        <div className="flex flex-col gap-4">
          <Heading>Women Outfit Type</Heading>
          <ul className="flex flex-col gap-2">
            {filterOptions.womenOutfitTypes.map((ot) => (
              <li key={ot.value}>
                <input
                  type="checkbox"
                  className="accent-pPink size-4 cursor-pointer"
                  checked={selectedOutfitTypes.includes(ot.value)}
                  onChange={() => handleToggle(ot.value, setSelectedOutfitTypes)}
                />{" "}
                <label className="text-subText cursor-pointer">{ot.title}</label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Season */}
      <div className="flex flex-col gap-4">
        <Heading>Season</Heading>
        <ul className="flex flex-col gap-2">
          {filterOptions.seasons.map((s) => (
            <li key={s.value}>
              <input
                type="checkbox"
                className="accent-pPink size-4 cursor-pointer"
                checked={selectedSeasons.includes(s.value)}
                onChange={() => handleToggle(s.value, setSelectedSeasons)}
              />{" "}
              <label className="text-subText cursor-pointer">{s.title}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Designs */}
      <div className="flex flex-col gap-4">
        <Heading>Designs</Heading>
        <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto">
          {filterOptions.designs.map((d) => (
            <li key={d.value}>
              <input
                type="checkbox"
                className="accent-pPink size-4 cursor-pointer"
                checked={selectedDesigns.includes(d.value)}
                onChange={() => handleToggle(d.value, setSelectedDesigns)}
              />{" "}
              <label className="text-subText cursor-pointer">{d.title}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Occasions */}
      <div className="flex flex-col gap-4">
        <Heading>Occasions</Heading>
        <ul className="flex flex-col gap-2">
          {filterOptions.occasions.map((o) => (
            <li key={o.value}>
              <input
                type="checkbox"
                className="accent-pPink size-4 cursor-pointer"
                checked={selectedOccasions.includes(o.value)}
                onChange={() => handleToggle(o.value, setSelectedOccasions)}
              />{" "}
              <label className="text-subText cursor-pointer">{o.title}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
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

      {/* Discount */}
      <div className="flex flex-col gap-4">
        <Heading>Discount</Heading>
        <ul className="flex flex-col gap-2">
          {filterOptions.discounts.map((d) => (
            <li key={d.value}>
              <input
                type="checkbox"
                className="accent-pPink size-4 cursor-pointer"
                checked={selectedDiscounts.includes(d.value)}
                onChange={() => handleToggle(d.value, setSelectedDiscounts)}
              />{" "}
              <label className="text-subText cursor-pointer">{d.title}</label>
            </li>
          ))}
        </ul>
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
  );

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
                <div className="bg-white h-fit p-6 shadow-md text-start rounded-lg">
                  <FilterContent />
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
          {isFilterOpen && <FilterContent />}
        </div>
      )}
    </>
  );
};

export default FilterSidebar;