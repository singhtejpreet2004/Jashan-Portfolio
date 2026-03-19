"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Research as ResearchType, Certification } from "@/types";

interface ResearchProps { research: ResearchType[]; certifications: Certification[]; }

export default function Research({ research, certifications }: ResearchProps) {
  return (
    <section id="research" className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Research & Certifications" light />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Research</h3>
              <div className="space-y-4">
                {research.map((r) => (
                  <div key={r._id} className="bg-white p-4 rounded-lg border border-gray-100">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{r.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{r.venue} — {r.year}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${r.status === "published" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                        {r.status === "published" ? "Published" : "In Progress"}
                      </span>
                    </div>
                    {r.link && (<a href={r.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-teal hover:underline mt-2 inline-block">View Paper ↗</a>)}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span key={cert._id} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full border border-gray-200" title={cert.name}>
                    {cert.issuer} — {cert.name}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
