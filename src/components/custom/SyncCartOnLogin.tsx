"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { usePathname } from "next/navigation";

import { setCart } from "@/redux/slices/cartSlice";
import { syncCart } from "@/utilityFunctions/cartFunctions";

export default function SyncCartOnLogin() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return;
    const excludedPaths = ["/about", "/services", "/contact"];// replace with the real paths later
    if (excludedPaths.includes(pathname)) {
      console.log("we are not syncing");
      return; // 🚫 skip sync on these pages
    }

    const runSync = async () => {
      console.log("syncing carts");
      const mergedCart = await syncCart();
      dispatch(setCart(mergedCart));
    };

    runSync();
  }, [user, dispatch, pathname]);

  return null; // no UI, just background logic
}

//   "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useAppDispatch } from "@/redux/hooks";
// import { syncCart } from "@/utilityFunctions/cartFunctions";
// import { setCart } from "@/redux/slices/cartSlice";

// export default function SyncCartOnSignup() {
//   const { user, isSignedIn } = useUser();
//   const dispatch = useAppDispatch();
//   const [isSynced, setIsSynced] = useState(false);

//   useEffect(() => {
//     console.log("req come the sync cart on login")
//     async function handleFirstTimeSync() {
//       if (!isSignedIn || !user || isSynced) return;

//       // Check if this user already synced before
//       const alreadySynced = user.publicMetadata?.hasSyncedCart;

//       if (!alreadySynced) {
//         console.log("🛒 Running first-time cart sync for:", user.id);
//         const mergedCart = await syncCart();
//         dispatch(setCart(mergedCart));

//         // Mark as synced (so next time it won’t run again)
//         await user.update({
//           publicMetadata: { hasSyncedCart: true },
//         });

//         setIsSynced(true);
//       }
//     }

//     handleFirstTimeSync();
//   }, [isSignedIn, user, dispatch, isSynced]);

//   return null;
// }
