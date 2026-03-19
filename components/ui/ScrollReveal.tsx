"use client";
import { motion, type TargetAndTransition, type Transition } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  variant?: "slide" | "scale" | "blur" | "glitch";
}

const getInitial = (direction: string, variant: string): TargetAndTransition => {
  switch (variant) {
    case "scale":
      return { opacity: 0, scale: 0.85 };
    case "blur":
      return { opacity: 0, filter: "blur(12px)", y: 30 };
    case "glitch":
      return { opacity: 0, x: -20, skewX: -8 };
    case "slide":
    default: {
      const offsets: Record<string, TargetAndTransition> = {
        up: { y: 60 },
        down: { y: -60 },
        left: { x: 60 },
        right: { x: -60 },
      };
      return { opacity: 0, ...offsets[direction] };
    }
  }
};

const getAnimate = (variant: string): TargetAndTransition => {
  switch (variant) {
    case "scale":
      return { opacity: 1, scale: 1, x: 0, y: 0 };
    case "blur":
      return { opacity: 1, filter: "blur(0px)", x: 0, y: 0 };
    case "glitch":
      return { opacity: 1, skewX: 0, x: 0, y: 0 };
    default:
      return { opacity: 1, x: 0, y: 0 };
  }
};

const getTransition = (variant: string, delay: number): Transition => {
  switch (variant) {
    case "scale":
      return { type: "spring", stiffness: 200, damping: 25, delay };
    case "blur":
      return { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay };
    case "glitch":
      return { type: "spring", stiffness: 300, damping: 20, delay };
    default:
      return { type: "spring", stiffness: 120, damping: 20, delay };
  }
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  variant = "slide",
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={getInitial(direction, variant)}
      whileInView={getAnimate(variant)}
      transition={getTransition(variant, delay)}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
