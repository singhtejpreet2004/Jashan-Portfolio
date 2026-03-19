"use client";
import { motion } from "framer-motion";
import type { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-[#0d1117] p-5 rounded-lg border border-[#21262d] border-l-[3px] transition-all duration-300 hover:border-[#30363d]"
      style={{
        borderLeftColor: skill.color,
        boxShadow: "none",
      }}
      whileHover={{
        boxShadow: `0 0 20px ${skill.color}15, 0 0 40px ${skill.color}08`,
      }}
    >
      <div
        className="text-xs font-mono font-semibold mb-3 uppercase tracking-wider"
        style={{ color: skill.color }}
      >
        {skill.category}
      </div>
      <div className="text-sm text-[#e6edf3] leading-relaxed">
        {skill.items.join(" · ")}
      </div>
    </motion.div>
  );
}
