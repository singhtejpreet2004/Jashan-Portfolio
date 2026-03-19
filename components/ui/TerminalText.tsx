"use client";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TerminalTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  prefix?: string;
}

export default function TerminalText({
  text,
  className,
  delay = 0,
  speed = 30,
  prefix = "~/portfolio $",
}: TerminalTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="text-[#8b949e] font-mono">{prefix} </span>
      <span className="text-[#00ff41]">{displayText}</span>
      <span
        className={`inline-block w-[8px] h-[1.1em] align-middle ml-[1px] ${
          done ? "animate-blink" : ""
        }`}
        style={{ backgroundColor: "#00ff41" }}
      />
    </span>
  );
}
