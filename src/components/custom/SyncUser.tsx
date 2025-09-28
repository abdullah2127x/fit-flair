"use client";
import apiClient from "@/lib/apiClient";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SyncUser() {
  const { user } = useUser();
  const [prevUserData, setPrevUserData] = useState<any>(null);

  useEffect(() => {
    console.log("request come to sync user");
    if (!user) return;

    const syncUser = async () => {
      try {
        // Check if user exists in the backend
        // automatically fetch the user with clerk id
        console.log("Sending req to api client getuser. ")
        const existingDBUser = await apiClient.getUser();
        console.log("the existing user res is : ", existingDBUser);
        if (!existingDBUser) {
          // Create user if not exists
          const newUser = await apiClient.createUser({
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phoneNumbers[0]?.phoneNumber,
          });
          console.log("User created:", newUser);
        } else {
          console.log("User already exists:", existingDBUser);
        }
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    syncUser();
  }, [user]);

  // useEffect(() => {
  //   if (!user) return;

  //   const updateUser = async () => {
  //     try {
  //       // Compare current user data with previous state
  //       const currentUserData = {
  //         email: user.primaryEmailAddress?.emailAddress || "",
  //         firstName: user.firstName || "",
  //         lastName: user.lastName || "",
  //         phone: user.phoneNumbers[0]?.phoneNumber,
  //       };

  //       if (JSON.stringify(currentUserData) !== JSON.stringify(prevUserData)) {
  //         // Update user if data has changed
  //         const updatedUser = await apiClient.updateUser(currentUserData);
  //         console.log("User updated:", updatedUser);
  //         setPrevUserData(currentUserData); // Update previous state
  //       }
  //     } catch (error) {
  //       console.error("Error updating user:", error);
  //     }
  //   };

  //   updateUser();
  // }, [user]);

  return null;
}
