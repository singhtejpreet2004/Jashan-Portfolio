"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  React: "#61dafb",
  "Next.js": "#e6edf3",
  "Power BI": "#f2c811",
  SQL: "#e38c00",
  Tableau: "#e97627",
  Excel: "#217346",
  R: "#198ce7",
  "Machine Learning": "#ff6f61",
  Docker: "#2496ed",
  AWS: "#ff9900",
  Node: "#68a063",
};

function toKebab(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function fakeStat(title: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  }
  return Math.abs(hash % max) + 1;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#030712" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Projects" />

        <div className="relative pl-10 md:pl-12 space-y-6">
          {/* Git graph line */}
          <div
            className="absolute left-4 md:left-5 top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, #00ff41, #58a6ff, #f0883e)",
            }}
          />

          {projects.map((project, i) => {
            const isExpanded = expandedId === project._id;
            const stars = fakeStat(project.title, 48);
            const forks = fakeStat(project.title + "f", 20);

            return (
              <ScrollReveal key={project._id} delay={i * 0.12}>
                <div className="relative">
                  {/* Git graph dot */}
                  <div
                    className="absolute -left-[26px] md:-left-[30px] top-5 w-3 h-3 rounded-full border-2 border-[#00ff41] bg-[#030712] z-10"
                  />

                  {/* Repo card */}
                  <motion.div
                    layout
                    onClick={() =>
                      setExpandedId(isExpanded ? null : project._id)
                    }
                    className="bg-[#0d1117] border border-[#21262d] rounded-md cursor-pointer transition-all duration-300 hover:border-[#00ff41]/50 hover:shadow-[0_0_15px_rgba(0,255,65,0.05)]"
                  >
                    <div className="p-5">
                      {/* Top row: repo name + public badge */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-lg">📁</span>
                        <a
                          className="text-[#58a6ff] font-semibold font-mono text-base hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.githubUrl)
                              window.open(project.githubUrl, "_blank");
                          }}
                        >
                          {toKebab(project.title)}
                        </a>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-[#21262d] text-[#8b949e]">
                          Public
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#8b949e] mt-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Bottom row: languages, stars, forks, date */}
                      <div className="flex items-center gap-4 mt-4 flex-wrap text-xs text-[#8b949e]">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block"
                              style={{
                                backgroundColor:
                                  LANG_COLORS[tech] || "#8b949e",
                              }}
                            />
                            <span>{tech}</span>
                          </span>
                        ))}
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                          {stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                          {forks}
                        </span>
                        <span className="ml-auto font-mono">
                          {formatDate(project.date)}
                        </span>
                      </div>
                    </div>

                    {/* Expanded README view */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#21262d] p-5">
                            {/* README header */}
                            <div className="flex items-center gap-2 mb-4">
                              <svg
                                className="w-4 h-4 text-[#8b949e]"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm7.251 10.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574zM8.755 4.75l-.004 7.322a3.752 3.752 0 011.992-.572H14.5v-9h-3.495a2.25 2.25 0 00-2.25 2.25z" />
                              </svg>
                              <span className="font-mono text-sm font-semibold text-[#e6edf3]">
                                README.md
                              </span>
                            </div>

                            {/* Achievements as markdown */}
                            <ul className="space-y-2">
                              {project.achievements.map((a, j) => (
                                <li
                                  key={j}
                                  className="text-sm text-[#e6edf3] flex gap-2"
                                >
                                  <span className="text-[#00ff41] font-mono">
                                    -
                                  </span>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Action buttons */}
                            <div className="flex gap-3 mt-5">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-medium px-4 py-1.5 rounded-md border border-[#21262d] bg-[#21262d] text-[#e6edf3] hover:bg-[#30363d] transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Code
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-medium px-4 py-1.5 rounded-md bg-[#238636] text-white hover:bg-[#2ea043] transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Live Demo
                                </a>
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
