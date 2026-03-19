"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Achievement } from "@/types";

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="py-20 md:py-28" style={{ background: "#030712" }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Achievements" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
          {achievements.map((a, i) => (
            <motion.div
              key={a._id}
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group flex flex-col items-center text-center p-6 rounded-xl border cursor-default transition-colors"
              style={{ borderColor: "#21262d", background: "#0d1117" }}
            >
              {/* Circular icon with glow */}
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(0,255,65,0.3)]"
                style={{
                  background: "rgba(0,255,65,0.08)",
                  border: "2px solid rgba(0,255,65,0.3)",
                }}
              >
                <span>{a.icon}</span>
              </div>
              <div className="font-bold text-sm" style={{ color: "#e6edf3" }}>
                {a.title}
              </div>
              <div className="text-xs mt-1" style={{ color: "#8b949e" }}>
                {a.subtitle}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
