import React from "react";
import { cn } from "@/lib/utils";

interface PrimaryHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const PrimaryHeading: React.FC<PrimaryHeadingProps> = ({
  children,
  className,
}) => {
  return (
    <span
      className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ${className || ""}`}
    >
      {children}
    </span>
  );
};

export default PrimaryHeading;
