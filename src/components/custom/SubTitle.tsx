import React from "react";

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ children, className }) => {
  return (
    <h4
      className={`text-lg md:text-xl lg:text-2xl max-w-5xl text-center tracking-wider ${className || ""}`}
    >
      {children}
    </h4>
  );
};

export default SubTitle;
