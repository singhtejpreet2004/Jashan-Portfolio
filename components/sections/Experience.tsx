"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";
import type { Experience as ExperienceType } from "@/types";

interface ExperienceProps {
  experiences: ExperienceType[];
}

function generateHash(seed: string, index: number): string {
  let hash = 0;
  const str = seed + index;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(16).padStart(7, "0").slice(0, 7);
}

function toBranchName(company: string, role: string): string {
  const slug = `${company}-${role}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
  return `feature/${slug}`;
}

function BranchLine({ index, inView }: { index: number; inView: boolean }) {
  const isEven = index % 2 === 0;
  // SVG path: fork right from main line, go to card, then merge back
  const forkPath = isEven
    ? "M 24 0 C 24 20, 60 30, 60 50 L 60 120 C 60 140, 24 150, 24 170"
    : "M 24 0 C 24 20, 60 30, 60 50 L 60 120 C 60 140, 24 150, 24 170";

  return (
    <svg
      className="absolute left-0 top-0 h-full"
      width="80"
      height="170"
      viewBox="0 0 80 170"
      fill="none"
      preserveAspectRatio="none"
      style={{ height: "100%" }}
    >
      <motion.path
        d={forkPath}
        stroke="#00ff41"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: 1.2, delay: index * 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

function CommitDot({
  top,
  delay,
  inView,
}: {
  top: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="absolute left-[18px] z-10"
      style={{ top }}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
    >
      <div className="w-[13px] h-[13px] rounded-full bg-[#00ff41] border-2 border-[#030712] shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
    </motion.div>
  );
}

function PRCard({
  exp,
  index,
  inView,
}: {
  exp: ExperienceType;
  index: number;
  inView: boolean;
}) {
  const branchName = toBranchName(exp.company, exp.role);
  const hashes = useRef(exp.achievements.map((a, j) => generateHash(a + exp.company, j)));

  return (
    <motion.div
      className="ml-[70px] relative group"
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: "easeOut" }}
    >
      <div className="bg-[#0d1117] border border-[#21262d] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#58a6ff]/50 hover:shadow-[0_0_20px_rgba(88,166,255,0.1)]">
        {/* PR Header */}
        <div className="px-4 py-2.5 border-b border-[#21262d] flex items-center gap-3 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#6e40c9]/20 border border-[#6e40c9]/40 text-[#d2a8ff]">
            <span className="w-2 h-2 rounded-full bg-[#8957e5]" />
            Merged
          </span>
          <span className="text-[#8b949e] truncate">
            <span className="text-[#58a6ff]">{branchName}</span>
            {" -> "}
            <span className="text-[#00ff41]">main</span>
          </span>
        </div>

        {/* PR Body */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-[#e6edf3] font-mono">
            {exp.role}
          </h3>
          <p className="text-sm text-[#8b949e] font-mono mt-0.5">
            @{exp.company.toLowerCase().replace(/\s+/g, "-")}
          </p>

          {/* Achievements as commits */}
          <div className="mt-4 space-y-2">
            {exp.achievements.map((achievement, j) => (
              <div
                key={j}
                className="flex gap-2 text-sm font-mono group/commit"
              >
                <span className="text-[#f0883e] shrink-0 opacity-60 group-hover/commit:opacity-100 transition-opacity">
                  {hashes.current[j]}
                </span>
                <span className="text-[#c9d1d9]">{achievement}</span>
              </div>
            ))}
          </div>

          {/* Footer: date range */}
          <div className="mt-4 pt-3 border-t border-[#21262d] flex items-center justify-between">
            <span className="text-xs font-mono text-[#00ff41]/70">
              {formatDate(exp.period.start)} — {exp.period.end === "Present" ? "Present" : formatDate(exp.period.end)}
            </span>
            <span className="text-xs font-mono text-[#8b949e]">
              {exp.achievements.length} commits
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience({ experiences }: ExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#030712]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Work Experience" />

        {/* Terminal header */}
        <motion.div
          className="mb-10 font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#0d1117] border border-[#21262d] rounded-md px-4 py-2">
            <span className="text-[#00ff41]">$</span>
            <span className="text-[#e6edf3]">
              git log --graph --oneline --all
            </span>
            <motion.span
              className="w-2 h-4 bg-[#00ff41] inline-block"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={sectionRef} className="relative">
          {/* Main branch line */}
          <motion.div
            className="absolute left-[24px] top-0 bottom-0 w-[2px] bg-[#00ff41] origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 0.4 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="space-y-12 pb-8">
            {experiences.map((exp, i) => (
              <div key={exp._id} className="relative">
                <BranchLine index={i} inView={inView} />
                <CommitDot
                  top="0px"
                  delay={0.2 + i * 0.15}
                  inView={inView}
                />
                <CommitDot
                  top="100%"
                  delay={0.8 + i * 0.15}
                  inView={inView}
                />
                <PRCard exp={exp} index={i} inView={inView} />
              </div>
            ))}
          </div>

          {/* HEAD label */}
          <motion.div
            className="flex items-center gap-2 ml-[10px]"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="w-[13px] h-[13px] rounded-full bg-[#00ff41] border-2 border-[#030712] shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            <span className="font-mono text-xs text-[#00ff41]">
              HEAD -&gt; main
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
