"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthButton() {
  const { isLoaded } = useUser(); // track loading state

  if (!isLoaded) {
    // show skeleton while Clerk is loading auth state
    return (
      <Skeleton className="h-9 w-9 rounded-full flex justify-center items-center">
        <User className="h-5 w-5" />
      </Skeleton>
    );
  }

  return (
    <>
      <SignedOut>
        <SignInButton
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
            },
          }}
          mode="modal"
        >
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex h-6 w-6 sm:w-9 sm:h-9"
          >
            <User className="h-5 w-5" />
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
