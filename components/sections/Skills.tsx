"use client";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";
import type { Skill } from "@/types";

interface SkillsProps { skills: Skill[]; }

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-20 md:py-28 bg-dark-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Technical Arsenal" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (<SkillCard key={skill._id} skill={skill} index={i} />))}
        </div>
      </div>
    </section>
  );
}
