"use client";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TerminalTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TerminalText({ text, className, delay = 0, speed = 30 }: TerminalTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="text-accent-teal">$ </span>
      {displayText}
      <span className="text-accent-teal animate-blink">|</span>
    </span>
  );
}
