"use client";

import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <Loader2 className="w-12 h-12 text-primary-foreground animate-spin" />

        {/* Optional text */}
        <p className="text-muted-foreground text-sm tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
