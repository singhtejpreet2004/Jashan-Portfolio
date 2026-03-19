"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ParticleGrid from "@/components/animations/ParticleGrid";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

const ROLES = ["Data Analyst", "SQL Expert", "BI Developer", "Python Developer"];
const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_DURATION = 2000;

function useTypewriter(strings: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % strings.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        isDeleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, index, isDeleting, strings]);

  return text;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const BADGES = [
  { emoji: "\uD83D\uDFE2", label: "Available for hire" },
  { emoji: "\uD83D\uDCCD", label: "Chandigarh, India" },
  { emoji: "\uD83C\uDF93", label: "B.Tech CSE 2026" },
];

export default function Hero({ settings }: HeroProps) {
  const typedRole = useTypewriter(ROLES);
  const [initText, setInitText] = useState("");
  const fullInit = "> initializing portfolio...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setInitText(fullInit.slice(0, i + 1));
      i++;
      if (i >= fullInit.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden" style={{ background: "#030712" }}>
      <ParticleGrid />

      {/* Dot grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Terminal init line */}
        <motion.p
          variants={slideUp}
          className="font-mono text-sm md:text-base mb-6"
          style={{ color: "#00ff41" }}
        >
          {initText}
          <span className="animate-pulse">_</span>
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={slideUp}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            textShadow: "0 0 40px rgba(0, 255, 65, 0.15), 0 0 80px rgba(0, 255, 65, 0.05)",
          }}
        >
          {settings.name}
        </motion.h1>

        {/* Terminal window */}
        <motion.div
          variants={slideUp}
          className="mt-8 rounded-lg overflow-hidden max-w-lg"
          style={{ background: "#0d1117", border: "1px solid #21262d" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: "1px solid #21262d" }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
            <span className="ml-3 text-xs font-mono" style={{ color: "#8b949e" }}>
              jashan@portfolio:~$
            </span>
          </div>
          {/* Terminal body */}
          <div className="px-4 py-4 font-mono text-sm md:text-base">
            <span style={{ color: "#8b949e" }}>$ whoami{"\n"}</span>
            <span style={{ color: "#00ff41" }}>{typedRole}</span>
            <span
              className="inline-block w-2 ml-0.5"
              style={{
                height: "1.1em",
                background: "#00ff41",
                animation: "blink 1s step-end infinite",
                verticalAlign: "text-bottom",
              }}
            />
          </div>
        </motion.div>

        {/* Status badges */}
        <motion.div variants={slideUp} className="mt-8 flex flex-wrap gap-3">
          {BADGES.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
              style={{
                background: "#0d1117",
                border: "1px solid #21262d",
                color: "#8b949e",
              }}
            >
              {badge.emoji} {badge.label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-wider" style={{ color: "#8b949e" }}>
          git log --oneline
        </span>
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#58a6ff"
          strokeWidth="1.5"
        >
          <path d="M5 8l5 5 5-5" />
        </motion.svg>
      </motion.div>

      {/* Blink keyframes */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
