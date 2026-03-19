"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineDot from "@/components/ui/TimelineDot";
import { formatDate } from "@/lib/utils";
import type { Experience as ExperienceType } from "@/types";

const TIMELINE_COLORS = ["#2dd4bf", "#818cf8", "#f59e0b", "#f472b6"];

interface ExperienceProps { experiences: ExperienceType[]; }

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Work Experience" light />
        <div className="relative pl-8 space-y-10">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp._id} direction="left" delay={i * 0.1}>
              <div className="relative">
                <TimelineDot color={TIMELINE_COLORS[i % TIMELINE_COLORS.length]} />
                <div className="border-l-2 pl-4" style={{ borderLeftColor: TIMELINE_COLORS[i % TIMELINE_COLORS.length] }}>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: TIMELINE_COLORS[i % TIMELINE_COLORS.length] }}>
                    {formatDate(exp.period.start)} — {formatDate(exp.period.end)}
                  </div>
                  <div className="text-lg font-bold text-gray-900 mt-1">{exp.role}</div>
                  <div className="text-sm text-gray-500">{exp.company}</div>
                  <ul className="mt-3 space-y-1">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-400 mt-1">—</span><span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
