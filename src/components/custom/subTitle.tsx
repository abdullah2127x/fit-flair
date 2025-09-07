import React from "react";
import { cn } from "@/lib/utils";

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ children, className }) => {
  return (
    <h4
      className={`text-lg md:text-xl lg:text-2xl  text-center md:text-left tracking-wider ${className || ""}`}
    >
      {children}
    </h4>
  );
};

export default SubTitle;
