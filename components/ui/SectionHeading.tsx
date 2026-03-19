import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <ScrollReveal className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#e6edf3]">
        <span className="font-mono text-[#00ff41] text-xl md:text-2xl mr-2 font-normal">##</span>
        <span style={{ textShadow: "0 0 20px rgba(0, 255, 65, 0.15)" }}>{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg font-mono text-[#8b949e]">
          <span className="text-[#484f58] mr-2">&gt;</span>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
