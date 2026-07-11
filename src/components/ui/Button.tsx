"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tapScale } from "@/lib/animations";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variants = {
  primary: "btn-primary",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

const sizes = {
  sm: "min-h-[40px] px-5 py-2 text-xs",
  md: "min-h-[48px] px-8 py-3 text-sm",
  lg: "min-h-[56px] px-10 py-4 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={tapScale}
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
