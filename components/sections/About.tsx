"use client";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/image";
import type { About as AboutType } from "@/types";

interface AboutProps { about: AboutType; }

export default function About({ about }: AboutProps) {
  if (!about) return null;
  return (
    <section id="about" className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="About Me" light />
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {about.photo && (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                <Image src={urlFor(about.photo).width(320).height(320).url()} alt={about.photo.alt || "Jashan Gupta"} width={320} height={320} className="object-cover w-full h-full" />
              </div>
            )}
            <div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">{about.bio}</p>
              {about.education && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Education</div>
                  <div className="font-semibold text-gray-900">{about.education.degree}</div>
                  <div className="text-sm text-gray-600">{about.education.institution} | {about.education.period}</div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
