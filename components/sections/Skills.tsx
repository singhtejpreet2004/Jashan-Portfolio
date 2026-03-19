"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Skill } from "@/types";

interface SkillsProps {
  skills: Skill[];
}

function SkillBar({ name, delay }: { name: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const width = 60 + Math.random() * 35; // pseudo proficiency 60-95%

  return (
    <div ref={ref} className="flex items-center gap-3 group">
      <span className="text-[#e6edf3] font-mono text-sm whitespace-nowrap">{name}</span>
      <div className="flex-1 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#00ff41] to-[#58a6ff]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${width}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: delay * 0.05, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function TerminalCategory({ skill, index }: { skill: Skill; index: number }) {
  const slug = skill.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="bg-[#0d1117] border border-[#21262d] rounded-lg overflow-hidden hover:border-[#00ff41]/30 transition-colors duration-300">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#21262d] bg-[#161b22]">
          <span className="w-3 h-3 rounded-full bg-[#f85149]" />
          <span className="w-3 h-3 rounded-full bg-[#f0883e]" />
          <span className="w-3 h-3 rounded-full bg-[#00ff41]" />
          <span className="ml-2 text-xs font-mono text-[#8b949e]">skills/{slug}.txt</span>
        </div>

        {/* Terminal content */}
        <div className="p-4 space-y-3">
          {/* Command prompt */}
          <div className="font-mono text-sm">
            <span className="text-[#00ff41]">$ </span>
            <span className="text-[#58a6ff]">cat</span>
            <span className="text-[#e6edf3]"> skills/{slug}.txt</span>
          </div>

          {/* Output */}
          <div className="font-mono text-sm text-[#8b949e] pl-2 border-l-2 border-[#21262d]">
            <span className="text-[#00ff41]">&gt; </span>
            <span className="text-[#e6edf3]">{skill.items.join(" | ")}</span>
          </div>

          {/* Skill bars */}
          <div className="pt-3 space-y-2.5">
            {skill.items.map((item, j) => (
              <SkillBar key={item} name={item} delay={j} />
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#030712" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#e6edf3 1px, transparent 1px), linear-gradient(90deg, #e6edf3 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        <SectionHeading title="Technical Arsenal" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((skill, i) => (
            <TerminalCategory key={skill._id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
