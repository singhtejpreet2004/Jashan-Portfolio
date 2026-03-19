"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Research as ResearchType, Certification } from "@/types";

interface ResearchProps {
  research: ResearchType[];
  certifications: Certification[];
}

export default function Research({ research, certifications }: ResearchProps) {
  return (
    <section id="research" className="py-20 md:py-28" style={{ background: "#030712" }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Research & Certifications" />

        {/* Research papers as npm-style packages */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "#21262d", color: "#f0883e" }}>
              packages
            </span>
            <span className="text-sm font-mono" style={{ color: "#8b949e" }}>
              {research.length} published
            </span>
          </div>
          <div className="space-y-4">
            {research.map((r, i) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border p-5 group hover:border-[#58a6ff]/50 transition-colors"
                style={{ borderColor: "#21262d", background: "#0d1117" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-sm" style={{ color: "#58a6ff" }}>
                        @research/
                      </span>
                      <span className="font-mono font-bold text-sm" style={{ color: "#e6edf3" }}>
                        {r.title.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}
                      </span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: "#e6edf3" }}>
                      {r.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-mono" style={{ color: "#8b949e" }}>
                      <span>registry: {r.venue}</span>
                      <span>|</span>
                      <span>{r.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full border"
                      style={{
                        color: r.status === "published" ? "#00ff41" : "#f0883e",
                        borderColor: r.status === "published" ? "#00ff41" : "#f0883e",
                        background: r.status === "published" ? "rgba(0,255,65,0.1)" : "rgba(240,136,62,0.1)",
                      }}
                    >
                      {r.status === "published" ? "v1.0.0 stable" : "v0.x.x beta"}
                    </span>
                  </div>
                </div>
                {r.link && (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono mt-3 hover:underline"
                    style={{ color: "#58a6ff" }}
                  >
                    $ npm info --registry {r.venue.toLowerCase().replace(/\s+/g, "-")} ↗
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications as badge grid */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "#21262d", color: "#a371f7" }}>
              badges
            </span>
            <span className="text-sm font-mono" style={{ color: "#8b949e" }}>
              {certifications.length} earned
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="rounded-lg border p-4 hover:border-[#a371f7]/50 transition-colors"
                style={{ borderColor: "#21262d", background: "#0d1117" }}
              >
                <div className="text-xs font-mono font-bold mb-1" style={{ color: "#a371f7" }}>
                  {cert.issuer}
                </div>
                <div className="text-sm font-medium" style={{ color: "#e6edf3" }}>
                  {cert.name}
                </div>
                <div className="text-xs font-mono mt-2" style={{ color: "#8b949e" }}>
                  issued {cert.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
