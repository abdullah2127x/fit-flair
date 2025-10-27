"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/custom/Footer"; // 👈 make sure you import Footer

const FooterWrapper = () => {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio"); // 👈 Check if URL starts with /studio

  return (
    <>
      {!isStudioRoute && (
        <div className="bg-secondary text-secondary-foreground">
          <div className="container mx-auto">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default FooterWrapper;
