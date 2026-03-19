"use client";
import { motion } from "framer-motion";

interface TimelineDotProps { color: string; }

export default function TimelineDot({ color }: TimelineDotProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
      className="absolute -left-[21px] top-1 w-3 h-3 rounded-full z-10"
      style={{ backgroundColor: color }}
    />
  );
}
