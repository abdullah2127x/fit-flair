"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";

import { setCart } from "@/redux/slices/cartSlice";
import { syncCart } from "@/utilityFunctions/cartFunctions";

export default function SyncCartOnLogin() {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    const runSync = async () => {
      const mergedCart = await syncCart();
      dispatch(setCart(mergedCart));
    };

    runSync();
  }, [user, dispatch]);

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
