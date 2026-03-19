"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/types";

const navLinks = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

interface NavbarProps {
  settings: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHash = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "backdrop-blur-xl border-[#21262d]"
          : "border-transparent"
      }`}
      style={{ backgroundColor: scrolled ? "rgba(1, 4, 9, 0.85)" : "#010409" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo / Terminal prompt */}
        <a href="#" className="flex items-center gap-2 font-mono text-sm group">
          <span className="inline-flex items-center px-2 py-0.5 bg-[#00ff41]/10 border border-[#00ff41]/30 rounded text-[#00ff41] font-bold text-xs tracking-wider">
            JG
          </span>
          <span className="text-[#8b949e] hidden sm:inline group-hover:text-[#e6edf3] transition-colors">
            ~/jashan <span className="text-[#00ff41]">$</span>
          </span>
        </a>

        {/* Desktop nav — tab style */}
        <div className="hidden md:flex items-center gap-0">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHash(link.href)}
                className={`relative px-4 py-3 text-xs font-mono tracking-wide transition-colors ${
                  isActive ? "text-[#00ff41]" : "text-[#8b949e] hover:text-[#e6edf3]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00ff41]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
          {settings.resumeFileUrl && (
            <a
              href={settings.resumeFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-xs font-mono px-3 py-1.5 border border-[#00ff41]/50 text-[#00ff41] rounded hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all"
            >
              resume
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[#21262d]"
            style={{ backgroundColor: "rgba(1, 4, 9, 0.97)" }}
          >
            <div className="px-6 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm font-mono text-[#8b949e] hover:text-[#00ff41] transition-colors"
                >
                  <span className="text-[#00ff41] mr-2">$</span>
                  {link.label}
                </a>
              ))}
              {settings.resumeFileUrl && (
                <a
                  href={settings.resumeFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-sm font-mono text-[#00ff41]"
                >
                  <span className="mr-2">$</span>resume --open
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
