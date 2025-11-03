import React from "react";
import { cn } from "@/lib/utils";
interface ButtonArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
export const ButtonArrow = ({
  children,
  className,
  ...props
}: ButtonArrowProps) => {
  return <button className={cn("group relative flex items-center gap-4 bg-transparent border-none cursor-pointer", "transition-all duration-300", className)} {...props}>
      {/* Texto com underline animado */}
      <span className="relative text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {children}
        {/* Underline animado */}
        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 origin-bottom-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-bottom-left" />
      </span>
      
      {/* Seta SVG */}
      
    </button>;
};