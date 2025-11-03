import React from "react";
import { cn } from "@/lib/utils";

interface ButtonGradientProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGradient = ({
  children,
  className,
  ...props
}: ButtonGradientProps) => {
  return (
    <button
      className={cn(
        "relative min-w-[120px] px-[17px] py-3 rounded-[7px]",
        "border-0 cursor-pointer",
        "text-white/66 transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)]",
        "hover:text-white hover:scale-110 hover:-translate-y-[3px]",
        "before:content-[''] before:absolute before:bottom-0 before:left-[15%] before:w-[70%] before:h-[1px]",
        "before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent",
        "before:opacity-20 before:transition-all before:duration-1000 before:ease-[cubic-bezier(0.15,0.83,0.66,1)]",
        "hover:before:opacity-100",
        className
      )}
      style={{
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
        background: "radial-gradient(ellipse at bottom, #1E3A5F 0%, #0F2744 45%, #0A1929 100%)",
      }}
      {...props}
    >
      {children}
    </button>
  );
};
