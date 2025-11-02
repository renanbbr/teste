"use client";
import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { cn } from "@/lib/utils";

interface ButtonHardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export const ButtonHard = ({
  children,
  icon,
  containerClassName,
  className,
  ...props
}: ButtonHardProps) => {
  return (
    <HoverBorderGradient
      containerClassName={cn("rounded-full", containerClassName)}
      as="button"
      className={cn(
        "bg-background text-foreground flex items-center space-x-2 px-6 py-3 font-medium",
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </HoverBorderGradient>
  );
};
