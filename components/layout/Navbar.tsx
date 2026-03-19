"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { SiteSettings } from "@/types";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps { settings: SiteSettings; }

export default function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-primary/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-lg text-white">
          JG<span className="text-accent-teal">.</span>
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          {settings.resumeFileUrl && (
            <a href={settings.resumeFileUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm px-4 py-2 border border-accent-teal text-accent-teal rounded hover:bg-accent-teal/10 transition-colors">
              Resume
            </a>
          )}
        </div>
        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-400" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-primary/95 backdrop-blur-xl border-b border-white/5 px-6 py-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          {settings.resumeFileUrl && (
            <a href={settings.resumeFileUrl} target="_blank" rel="noopener noreferrer" className="block py-2 text-accent-teal">
              Resume ↗
            </a>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
