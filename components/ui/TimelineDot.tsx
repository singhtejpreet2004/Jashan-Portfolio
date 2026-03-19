"use client";
import { motion } from "framer-motion";

interface TimelineDotProps {
  color?: string;
}

export default function TimelineDot({ color = "#00ff41" }: TimelineDotProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      viewport={{ once: true }}
      className="absolute -left-[23px] top-1 w-4 h-4 rounded-full z-10 border-[2.5px] border-[#030712]"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 0 2px ${color}40, 0 0 12px ${color}50`,
      }}
    >
      <motion.div
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 0, scale: 2.5 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}
