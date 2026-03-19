"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SiteSettings } from "@/types";

interface ContactProps {
  settings: SiteSettings;
}

export default function Contact({ settings }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative"
      style={{ background: "#030712" }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#e6edf3 1px, transparent 1px), linear-gradient(90deg, #e6edf3 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6">
        <SectionHeading
          title="Let's Connect"
          subtitle="Open to opportunities in data analytics & business intelligence"
         
        />

        {/* Terminal-styled form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 rounded-lg border overflow-hidden"
          style={{ borderColor: "#21262d", background: "#0d1117" }}
        >
          {/* Terminal title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: "#21262d", background: "#161b22" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs font-mono" style={{ color: "#8b949e" }}>
              contact — send-message.sh
            </span>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 font-mono">
            <div>
              <label className="text-xs mb-1.5 flex items-center gap-1" style={{ color: "#00ff41" }}>
                <span style={{ color: "#8b949e" }}>$</span> name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-md text-sm focus:outline-none transition-colors"
                style={{
                  background: "#0d1117",
                  border: "1px solid #21262d",
                  color: "#e6edf3",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00ff41")}
                onBlur={(e) => (e.target.style.borderColor = "#21262d")}
                placeholder="your_name"
              />
            </div>
            <div>
              <label className="text-xs mb-1.5 flex items-center gap-1" style={{ color: "#00ff41" }}>
                <span style={{ color: "#8b949e" }}>$</span> email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-md text-sm focus:outline-none transition-colors"
                style={{
                  background: "#0d1117",
                  border: "1px solid #21262d",
                  color: "#e6edf3",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00ff41")}
                onBlur={(e) => (e.target.style.borderColor = "#21262d")}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs mb-1.5 flex items-center gap-1" style={{ color: "#00ff41" }}>
                <span style={{ color: "#8b949e" }}>$</span> message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2.5 rounded-md text-sm focus:outline-none transition-colors resize-none"
                style={{
                  background: "#0d1117",
                  border: "1px solid #21262d",
                  color: "#e6edf3",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00ff41")}
                onBlur={(e) => (e.target.style.borderColor = "#21262d")}
                placeholder="your message here..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-2.5 rounded-md text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "#00ff41",
                color: "#030712",
              }}
            >
              {status === "sending"
                ? "$ sending..."
                : status === "sent"
                ? "$ message sent!"
                : "$ send_message --now"}
            </button>
            {status === "error" && (
              <p className="text-xs text-center font-mono" style={{ color: "#f85149" }}>
                Error: connection refused. Please try again.
              </p>
            )}
          </form>
        </motion.div>

        {/* Social links as terminal commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 space-y-2 font-mono text-sm"
        >
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors hover:border-[#00ff41]/40"
            style={{ borderColor: "#21262d", background: "#0d1117", color: "#8b949e" }}
          >
            <span style={{ color: "#00ff41" }}>$</span>
            <span>open</span>
            <span style={{ color: "#58a6ff" }}>mailto:{settings.email}</span>
          </a>
          {settings.linkedinUrl && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors hover:border-[#00ff41]/40"
              style={{ borderColor: "#21262d", background: "#0d1117", color: "#8b949e" }}
            >
              <span style={{ color: "#00ff41" }}>$</span>
              <span>open</span>
              <span style={{ color: "#58a6ff" }}>linkedin://profile</span>
            </a>
          )}
          {settings.githubUrl && (
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors hover:border-[#00ff41]/40"
              style={{ borderColor: "#21262d", background: "#0d1117", color: "#8b949e" }}
            >
              <span style={{ color: "#00ff41" }}>$</span>
              <span>open</span>
              <span style={{ color: "#58a6ff" }}>github://profile</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
