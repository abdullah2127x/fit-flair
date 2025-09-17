import React from "react";
import { Button } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot"; // ✅ allows passing child component
import { cn } from "@/lib/utils";

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
}

const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Button;

    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          "px-8 py-3 rounded-md font-medium transition-colors", // default styles
          className
        )}
      >
        {children}
      </Comp>
    );
  }
);

MyButton.displayName = "MyButton";

export default MyButton;
