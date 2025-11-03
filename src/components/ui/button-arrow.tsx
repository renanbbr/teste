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
  return (
    <button
      className={cn(
        "group relative flex items-center gap-4 bg-transparent border-none cursor-pointer",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Texto com underline animado */}
      <span className="relative pb-2 text-sm uppercase tracking-[4px] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {children}
        {/* Underline animado */}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-bottom-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-bottom-left" />
      </span>
      
      {/* Seta SVG */}
      <svg
        className="w-[30px] h-[10px] fill-muted-foreground -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:fill-foreground group-active:scale-90"
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={10}
        viewBox="0 0 46 16"
      >
        <path
          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
          transform="translate(30)"
        />
      </svg>
    </button>
  );
};
