"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SiteSettings } from "@/types";

interface ContactProps { settings: SiteSettings; }

export default function Contact({ settings }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: "linear-gradient(#0a0a0a, #111827)" }}>
      <div className="max-w-2xl mx-auto px-6">
        <SectionHeading title="Let's Connect" subtitle="Open to opportunities in data analytics & business intelligence" />
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal/50 transition-colors" />
            <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal/50 transition-colors" />
            <textarea placeholder="Your Message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal/50 transition-colors resize-none" />
            <button type="submit" disabled={status === "sending"}
              className="w-full py-3 bg-accent-teal text-dark-primary font-semibold rounded-lg hover:bg-accent-teal/90 transition-colors disabled:opacity-50">
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
            </button>
            {status === "error" && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
          </form>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-4 mt-8">
            <a href={`mailto:${settings.email}`} className="px-4 py-2 bg-card border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-accent-teal/30 transition-colors">✉ Email</a>
            {settings.linkedinUrl && (<a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-accent-teal/30 transition-colors">LinkedIn</a>)}
            {settings.githubUrl && (<a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-accent-teal/30 transition-colors">GitHub</a>)}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
