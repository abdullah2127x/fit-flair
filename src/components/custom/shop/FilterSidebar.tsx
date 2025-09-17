// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";

// interface FilterSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   device: "desktop" | "mobile";
// }

// const FilterSidebar = ({ isOpen, onClose, device }: FilterSidebarProps) => {
//   return (
//     <>
//       {/* ✅ Mobile: Sheet */}
//       <div className="lg:hidden">
//         <Sheet open={isOpen && device == "mobile"} onOpenChange={onClose}>
//           <SheetContent
//             side="left"
//             className="w-64 bg-primary text-primary-foreground p-4"
//           >
//             <SheetHeader>
//               <SheetTitle>Clothing Filters</SheetTitle>
//             </SheetHeader>

//             <div className="space-y-2 mt-4">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" /> Shirts
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" /> Pants
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" /> Jackets
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" /> Shoes
//               </label>
//             </div>

//             <div className="mt-6 flex gap-2">
//               <Button variant="secondary" className="w-full" onClick={onClose}>
//                 Apply
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full text-primary-foreground border-primary-foreground"
//               >
//                 Reset
//               </Button>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>

//       {/* ✅ Desktop: Static Sidebar */}
//       <div className="hidden lg:block w-64 bg-primary text-primary-foreground p-4 h-screen sticky top-0">
//         <h2 className="font-semibold text-lg mb-4">Clothing Filters</h2>

//         <div className="space-y-2">
//           <label className="flex items-center gap-2">
//             <input type="checkbox" /> Shirts
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="checkbox" /> Pants
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="checkbox" /> Jackets
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="checkbox" /> Shoes
//           </label>
//         </div>

//         <div className="mt-6 flex gap-2">
//           <Button variant="secondary" className="w-full">
//             Apply
//           </Button>
//           <Button
//             variant="outline"
//             className="w-full text-primary-foreground border-primary-foreground"
//           >
//             Reset
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterSidebar;

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeSidebar } from "@/redux/slices/filterSidebarSlice";

const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const { isFilterOpen, device } = useAppSelector(
    (state) => state.filterSidebar
  );

  const handleApply = () => {
    dispatch(closeSidebar());
    console.log("Filter is applied with Sidebar and then closed! ");
  };
  const handleClose = () => {
    dispatch(closeSidebar());
    console.log("Sidebar is closed! ");
  };

  return (
    <>
      {/* ✅ Mobile: Sheet */}
      {device === "mobile" && (
        <div className="lg:hidden">
          <Sheet open={isFilterOpen} onOpenChange={handleClose}>
            <SheetContent
              side="left"
              className="w-64 bg-primary text-primary-foreground p-4"
            >
              <SheetHeader>
                <SheetTitle>Clothing Filters</SheetTitle>
              </SheetHeader>

              <div className="space-y-2 mt-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Shirts
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Pants
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Jackets
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Shoes
                </label>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleApply}
                >
                  Apply
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-primary-foreground border-primary-foreground"
                >
                  Reset
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* ✅ Desktop: Static Sidebar */}
      {device === "desktop" && isFilterOpen && (
        <div className="hidden lg:block w-64 bg-primary text-primary-foreground p-4 h-screen sticky top-0">
          <h2 className="font-semibold text-lg mb-4">Clothing Filters</h2>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Shirts
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Pants
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Jackets
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Shoes
            </label>
          </div>

          <div className="mt-6 flex gap-2">
            <Button
              onClick={handleApply}
              variant="secondary"
              className="w-full"
            >
              Apply
            </Button>
            <Button
              variant="outline"
              className="w-full text-primary-foreground border-primary-foreground"
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
