import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps { title: string; subtitle?: string; light?: boolean; }

export default function SectionHeading({ title, subtitle, light }: SectionHeadingProps) {
  return (
    <ScrollReveal className="mb-12 text-center">
      <h2 className={`text-3xl md:text-4xl font-heading font-bold ${light ? "text-gray-900" : "text-white"}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-3 text-lg ${light ? "text-gray-600" : "text-gray-400"}`}>{subtitle}</p>}
    </ScrollReveal>
  );
}
