"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";

import { fetchCartFromDB, setCart } from "@/redux/slices/cartSlice";
import {
  clearCartFromLocalStorage,
  saveCartToLocalStorage,
  syncCart,
} from "@/utilityFunctions/cartFunctions";

export default function SyncCartOnLogin() {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    const runSync = async () => {
      // console.log("🔄 User logged in, syncing cart...");
      // await syncCart(); // merge local + db and save on both places

      // clearCartFromLocalStorage();
      // dispatch(fetchCartFromDB()); // refresh Redux state from DB x

      const mergedCart = await syncCart();
      console.log("The merged carts in the sunc user are : ", mergedCart);
      dispatch(setCart(mergedCart));
    };

    runSync();
  }, [user, dispatch]);

  return null; // no UI, just background logic
}

// "use client";
// import apiClient from "@/lib/apiClient";
// import {
//   loadCartFromLocalStorage,
//   syncCart,
// } from "@/utilityFunctions/cartFunctions";
// import { useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";

// export default function SyncUser() {
//   const { user } = useUser();
//   const [prevUserData, setPrevUserData] = useState<any>(null);

//   useEffect(() => {
//     console.log("request come to sync user");
//     if (!user) return;

//     const handleSync = async () => {
//       console.log("User signed in → syncing cart...");
//        const merged = await syncCart(); // merge local + db
//         dispatch(fetchCartFromDB());
//       await syncCart();
//     };
//     handleSync();
//     // const syncCart = async () => {
//     //   try {
//     //     // Check if user exists in the backend
//     //     // automatically fetch the user with clerk id
//     //     console.log("Sending req to api client getCart. ");
//     //     const dbCartItems = await apiClient.getCart();
//     //     if (!dbCartItems) {
//     //       // Create user if not exists

//     //       console.log(
//     //         "Error getting the cart items from database :",
//     //         dbCartItems
//     //       );
//     //     } else {
//     //       console.log("the cart items are : ", dbCartItems);

//     //     }
//     //   } catch (error) {
//     //     console.error("Error syncing user:", error);
//     //   }
//     // };

//     // const syncCart = async () => {
//     //   try {
//     //     // Check if user exists in the backend
//     //     // automatically fetch the user with clerk id
//     //     console.log("Getting cart from local storage.");
//     //     const localCartItems = loadCartFromLocalStorage();
//     //     if (localCartItems.length > 0) {
//     //       const addManyToCartRes =
//     //         await apiClient.addManyToCart(localCartItems);

//     //       if (!addManyToCartRes) {
//     //         console.log(
//     //           "Getting the error while saving the cart form local to db",
//     //           addManyToCartRes
//     //         );
//     //       } else {
//     //         console.log("local cart saved to db successfully.");
//     //       }
//     //       // Create user if not exists
//     //     } else {
//     //       console.log("there is no cart items in the local storage ");
//     //     }
//     //   } catch (error) {
//     //     console.error("Error syncing user:", error);
//     //   }
//     // };

//     // const syncUser = async () => {
//     //   try {
//     //     // Check if user exists in the backend
//     //     // automatically fetch the user with clerk id
//     //     console.log("Sending req to api client getuser. ")
//     //     const existingDBUser = await apiClient.getUser();
//     //     console.log("the existing user res is : ", existingDBUser);
//     //     if (!existingDBUser) {
//     //       // Create user if not exists
//     //       const newUser = await apiClient.createUser({
//     //         email: user.primaryEmailAddress?.emailAddress || "",
//     //         firstName: user.firstName || "",
//     //         lastName: user.lastName || "",
//     //         phone: user.phoneNumbers[0]?.phoneNumber,
//     //       });
//     //       console.log("User created:", newUser);
//     //     } else {
//     //       console.log("User already exists:", existingDBUser);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error syncing user:", error);
//     //   }
//     // };

//     // syncUser();
//     syncCart();
//   }, [user]);

//   // useEffect(() => {
//   //   if (!user) return;

//   //   const updateUser = async () => {
//   //     try {
//   //       // Compare current user data with previous state
//   //       const currentUserData = {
//   //         email: user.primaryEmailAddress?.emailAddress || "",
//   //         firstName: user.firstName || "",
//   //         lastName: user.lastName || "",
//   //         phone: user.phoneNumbers[0]?.phoneNumber,
//   //       };

//   //       if (JSON.stringify(currentUserData) !== JSON.stringify(prevUserData)) {
//   //         // Update user if data has changed
//   //         const updatedUser = await apiClient.updateUser(currentUserData);
//   //         console.log("User updated:", updatedUser);
//   //         setPrevUserData(currentUserData); // Update previous state
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating user:", error);
//   //     }
//   //   };

//   //   updateUser();
//   // }, [user]);

//   return null;
// }
