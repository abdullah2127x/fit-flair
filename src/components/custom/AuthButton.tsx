"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"; // assuming Clerk auth
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AuthButton() {
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
            className="inline-flex h-6 w-6 sm:w-9 sm:h-9 "
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
