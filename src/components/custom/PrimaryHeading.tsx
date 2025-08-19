import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const PrimaryHeading: React.FC<PrimaryHeadingProps> = ({ children, className }) => {
  return (
    <h1 
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
        "text-primary ",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default PrimaryHeading;
