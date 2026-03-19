"use client";
import { motion } from "framer-motion";
import ParticleGrid from "@/components/animations/ParticleGrid";
import TerminalText from "@/components/ui/TerminalText";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const nameLetters = settings.name.split("");

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-primary">
      <ParticleGrid />
      <div className="relative z-10 text-center px-6">
        {/* Title label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-accent-teal text-sm md:text-base tracking-[4px] uppercase font-mono mb-4"
        >
          {settings.title}
        </motion.div>
        {/* Name - letter by letter */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tight">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        {/* Terminal tagline */}
        <div className="mt-6 max-w-xl mx-auto font-mono text-sm md:text-base text-gray-500">
          <TerminalText text={settings.tagline} delay={1.2} speed={30} />
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 animate-bounce-slow"
      >
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 4v16m0 0l-4-4m4 4l4-4" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
