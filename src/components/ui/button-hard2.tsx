"use client";
import React from "react";
import { HoverBorderGradientTransparent } from "./hover-border-gradient-transparent";
import { cn } from "@/lib/utils";

interface ButtonHard2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export const ButtonHard2 = ({
  children,
  icon,
  containerClassName,
  className,
  ...props
}: ButtonHard2Props) => {
  return (
    <HoverBorderGradientTransparent
      containerClassName={cn("rounded-full", containerClassName)}
      as="button"
      className={cn(
        "bg-transparent text-foreground flex items-center space-x-2 px-6 py-3 font-medium",
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </HoverBorderGradientTransparent>
  );
};
