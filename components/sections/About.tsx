"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { About as AboutType } from "@/types";

interface AboutProps {
  about: AboutType;
}

export default function About({ about }: AboutProps) {
  if (!about) return null;

  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "#030712" }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="About Me" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Terminal card: cat about.md */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden border"
            style={{ borderColor: "#21262d", background: "#0d1117" }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "#21262d", background: "#161b22" }}
            >
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs font-mono" style={{ color: "#8b949e" }}>
                ~/jashan — zsh
              </span>
            </div>
            {/* Terminal body */}
            <div className="p-5 font-mono text-sm leading-relaxed">
              <p style={{ color: "#00ff41" }}>
                <span style={{ color: "#8b949e" }}>$</span> cat about.md
              </p>
              <div className="mt-4" style={{ color: "#e6edf3" }}>
                <p className="leading-relaxed whitespace-pre-line">{about.bio}</p>
              </div>
              <p className="mt-4" style={{ color: "#00ff41" }}>
                <span style={{ color: "#8b949e" }}>$</span>{" "}
                <span className="animate-pulse">▊</span>
              </p>
            </div>
          </motion.div>

          {/* Education: GitHub profile card style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="rounded-lg border"
            style={{ borderColor: "#21262d", background: "#0d1117" }}
          >
            {/* Card header */}
            <div
              className="px-5 py-3 border-b flex items-center gap-2"
              style={{ borderColor: "#21262d" }}
            >
              <svg
                className="w-4 h-4"
                fill="#00ff41"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 000 2.5v11a.5.5 0 00.707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 00.78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0016 13.5v-11a.5.5 0 00-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>
                Education
              </span>
            </div>

            {about.education && (
              <div className="p-5">
                <div
                  className="rounded-lg p-4 border-l-4"
                  style={{
                    borderColor: "#00ff41",
                    background: "rgba(0,255,65,0.05)",
                  }}
                >
                  <div
                    className="text-base font-semibold"
                    style={{ color: "#e6edf3" }}
                  >
                    {about.education.degree}
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: "#8b949e" }}
                  >
                    {about.education.institution}
                  </div>
                  <div
                    className="text-xs mt-2 inline-block px-2 py-0.5 rounded-full border"
                    style={{
                      color: "#00ff41",
                      borderColor: "#00ff41",
                      background: "rgba(0,255,65,0.1)",
                    }}
                  >
                    {about.education.period}
                  </div>
                </div>

                {/* Contribution-style decoration */}
                <div className="mt-6">
                  <div
                    className="text-xs mb-2 font-mono"
                    style={{ color: "#8b949e" }}
                  >
                    contribution activity
                  </div>
                  <div className="flex gap-[3px] flex-wrap">
                    {Array.from({ length: 35 }).map((_, i) => {
                      const opacity = [0.1, 0.25, 0.5, 0.75, 1][
                        Math.floor(Math.random() * 5)
                      ];
                      return (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-sm"
                          style={{
                            background: `rgba(0,255,65,${opacity})`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
