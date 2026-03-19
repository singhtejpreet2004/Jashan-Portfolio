"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineDot from "@/components/ui/TimelineDot";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

const DOT_COLORS = ["#2dd4bf", "#818cf8", "#f59e0b", "#f472b6"];

interface ProjectsProps { projects: Project[]; }

export default function Projects({ projects }: ProjectsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 bg-dark-tertiary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Projects" />
        <div className="relative pl-8 space-y-8">
          <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, #2dd4bf, #818cf8, #f59e0b)" }} />
          {projects.map((project, i) => {
            const isExpanded = expandedId === project._id;
            const color = DOT_COLORS[i % DOT_COLORS.length];
            return (
              <ScrollReveal key={project._id} delay={i * 0.15}>
                <div className="relative">
                  <TimelineDot color={color} />
                  <motion.div layout onClick={() => setExpandedId(isExpanded ? null : project._id)}
                    className="bg-card p-5 rounded-xl cursor-pointer border transition-colors"
                    style={{ borderColor: isExpanded ? color + "66" : color + "22" }}
                    whileHover={{ borderColor: color + "44" }}>
                    <div className="text-xs font-mono" style={{ color }}>{formatDate(project.date)}</div>
                    <div className="text-lg font-bold text-white mt-1">{project.title}</div>
                    <p className="text-sm text-gray-400 mt-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: color + "22", color }}>{tech}</span>
                      ))}
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="pt-4 mt-4 border-t border-white/10">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key Achievements</div>
                            <ul className="space-y-1">
                              {project.achievements.map((a, j) => (
                                <li key={j} className="text-sm text-gray-300 flex gap-2"><span className="text-accent-teal">●</span><span>{a}</span></li>
                              ))}
                            </ul>
                            <div className="flex gap-3 mt-4">
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                  className="text-xs px-3 py-1.5 border border-white/20 rounded text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                                  onClick={(e) => e.stopPropagation()}>GitHub ↗</a>
                              )}
                              {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                  className="text-xs px-3 py-1.5 bg-accent-teal/10 border border-accent-teal/30 rounded text-accent-teal hover:bg-accent-teal/20 transition-colors"
                                  onClick={(e) => e.stopPropagation()}>Live Demo ↗</a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
