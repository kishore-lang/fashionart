import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "chocolate" | "blush" | "outline";
}

export function Badge({
  className,
  variant = "gold",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    gold: "bg-[#E8B520]/15 text-[#8F6C07] border border-[#E8B520]/40",
    chocolate: "bg-[#4A2511]/10 text-[#4A2511] border border-[#4A2511]/20",
    blush: "bg-[#F4DCD6] text-[#4A2511] border border-[#F4DCD6]",
    outline: "border border-[#4A2511]/30 text-[#4A2511]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
