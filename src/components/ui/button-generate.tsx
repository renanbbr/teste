"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ButtonGenerateProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  textActive?: string;
  className?: string;
}

export const ButtonGenerate = ({
  text = "Generate",
  textActive = "Generating",
  className,
  ...props
}: ButtonGenerateProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const displayText = isFocused ? textActive : text;
  const letters = displayText.split("");

  return (
    <div className="relative inline-block">
      <button
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "generate-btn relative flex items-center justify-center",
          "px-[1.1em] py-[0.5em] text-base font-normal",
          "bg-[#101010] rounded-[24px]",
          "border border-white/10",
          "cursor-pointer select-none",
          "transition-all duration-[400ms]",
          className
        )}
        style={{
          fontFamily: '"Poppins", "Inter", "Segoe UI", sans-serif',
        }}
        {...props}
      >
        {/* SVG Icon */}
        <svg 
          className="generate-svg mr-2 h-6 w-6 fill-[#e8e8e8] animate-flicker flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>

        {/* Animated Text */}
        <div className="relative flex items-center min-w-[6.4em] tracking-[-0.05em]">
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}-${displayText}`}
              className="generate-letter inline-block text-white/30"
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </button>
    </div>
  );
};
