"use client";

import { Loader2 } from "lucide-react";

interface FullPageLoaderProps {
  message?: string; // optional message
}

export default function FullPageLoader({
  message = "Loading, please wait...",
}: FullPageLoaderProps) {
  return (
    <div className="container min-h-[70vh]  flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <Loader2 className="w-12 h-12 text-primary-foreground animate-spin" />

        {/* Status message */}
        <p className="text-muted-foreground text-sm tracking-wide animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
