import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple admin check – extend as needed (e.g., roles in DB)
export const isAdminClerkId = (clerkId?: string) => {
  const admins = (process.env.NEXT_PUBLIC_ADMIN_CLERK_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  console.log(!!clerkId && admins.includes(clerkId));
  return !!clerkId && admins.includes(clerkId);
};
