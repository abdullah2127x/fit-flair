"use client";

import React, { useState } from "react";
import ShopHeader from "@/components/custom/shop/FilterHeader";
import ShopProducts from "@/components/custom/shop/ShowProducts";
import FilterSidebar from "@/components/custom/shop/FilterSidebar";
import { useAppSelector } from "@/redux/hooks";

const Shop = () => {
  // const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  // const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const { isFilterOpen, device } = useAppSelector(
    (state) => state.filterSidebar
  );

  return (
    <div className="min-h-screen overflow-x-hidden flex container mx-auto px-4">
      {/* Header with filter button */}
      {/* Sidebar only takes space when open */}
      {isFilterOpen && (
        // <div className="w-64 shrink-0">
        <FilterSidebar />
        // {/* </div> */}
      )}

      {/* Main content: sidebar + products */}
      <div className="flex flex-col overflow-x-hidden flex-1 gap-4 pb-16 ">
        
        <div className="w-full  relative">
          <ShopHeader />
        </div>


        {/* Products adjust automatically */}
        <div className="flex-1">
          <ShopProducts view="grid" />
        </div>
      </div>
    </div>
  );
};

export default Shop;

// ("use client");

// import React, { useState } from "react";
// import ShopHeader from "@/components/custom/shop/FilterHeader";
// import ShopProducts from "@/components/custom/shop/ShowProducts";
// import FilterSidebar from "@/components/custom/shop/FilterSidebar";

// const Shop = () => {
//   const [isFilterOpen, setIsFilterOpen] = React.useState(false);
//   const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

//   return (
//     <div className="min-h-screen overflow-hidden flex flex-col gap-4 container mx-auto relative">
//       {/* Header with filter button */}
//       <ShopHeader
//         isOpen={isFilterOpen}
//         setIsOpen={setIsFilterOpen}
//         setDevice={setDevice}
//       />

//       {/* Main content: sidebar + products */}
//       <div className="flex gap-4 pb-16">
//         {/* Sidebar only takes space when open */}
//         {isFilterOpen && (
//           <div className="w-64 shrink-0">
//             <FilterSidebar
//               isOpen={isFilterOpen}
//               onClose={() => setIsFilterOpen(false)}
//               device={device}
//             />
//           </div>
//         )}

//         {/* Products adjust automatically */}
//         <div className="flex-1">
//           <ShopProducts view="grid" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;
