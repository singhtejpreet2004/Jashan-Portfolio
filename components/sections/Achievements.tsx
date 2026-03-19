"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Achievement } from "@/types";

interface AchievementsProps { achievements: Achievement[]; }

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="py-20 md:py-28 bg-dark-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Achievements" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((a, i) => (
            <motion.div key={a._id} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-card p-5 rounded-xl text-center">
              <div className="text-3xl mb-2">{a.icon}</div>
              <div className="font-bold text-white text-sm">{a.title}</div>
              <div className="text-xs text-gray-400 mt-1">{a.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
