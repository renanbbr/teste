import React from "react";
import { cn } from "@/lib/utils";

interface BadgeExclusiveProps {
  className?: string;
}

export const BadgeExclusive = ({ className }: BadgeExclusiveProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "px-2 py-0.5 rounded-md",
        "text-[10px] font-bold uppercase tracking-wider",
        "bg-[#0D6EFD]/10 text-[#0D6EFD]",
        "border border-[#0D6EFD]/30",
        "shadow-[0_0_8px_rgba(13,110,253,0.3)]",
        "transition-all duration-300",
        "hover:shadow-[0_0_12px_rgba(13,110,253,0.5)]",
        "md:ml-2",
        className
      )}
    >
      Exclusivo
    </span>
  );
};
