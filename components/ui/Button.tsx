import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:opacity-90 cursor-pointer touch-manipulation select-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[#4A2511] text-white hover:bg-[#381B0C] focus:ring-[#4A2511] shadow-md hover:shadow-lg",
      secondary:
        "bg-[#F4DCD6] text-[#4A2511] hover:bg-[#ebd0c9] focus:ring-[#F4DCD6]",
      gold:
        "bg-gradient-to-r from-[#E8B520] to-[#dfa711] text-[#4A2511] font-semibold hover:from-[#dfa711] hover:to-[#cb9508] shadow-gold hover:shadow-lg focus:ring-[#E8B520]",
      outline:
        "border-2 border-[#4A2511] text-[#4A2511] hover:bg-[#4A2511] hover:text-white focus:ring-[#4A2511]",
      ghost:
        "text-[#4A2511] hover:bg-[#F4DCD6]/40 focus:ring-[#4A2511]",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
