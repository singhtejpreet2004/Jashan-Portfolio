"use client";
import { motion } from "framer-motion";
import type { Skill } from "@/types";

interface SkillCardProps { skill: Skill; index: number; }

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card p-4 rounded-lg border-l-[3px]"
      style={{ borderLeftColor: skill.color }}
    >
      <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: skill.color }}>
        {skill.category}
      </div>
      <div className="text-sm text-gray-300">{skill.items.join(" · ")}</div>
    </motion.div>
  );
}
