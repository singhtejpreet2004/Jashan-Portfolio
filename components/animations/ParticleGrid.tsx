"use client";
import { useEffect, useRef } from "react";

const CHARACTERS = "01{}<>=|:.;/\\[]()&%#@!?+-*^~";
const FONT_SIZE = 14;
const COLOR = "#00ff41";

interface Column {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  chars: string[];
  length: number;
}

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let columns: Column[] = [];

    const randomChar = () =>
      CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

    const createColumns = () => {
      const count = Math.floor(canvas.width / FONT_SIZE);
      columns = [];
      for (let i = 0; i < count; i++) {
        if (Math.random() > 0.4) continue; // sparse — not every column
        const length = Math.floor(Math.random() * 15) + 5;
        const chars: string[] = [];
        for (let j = 0; j < length; j++) chars.push(randomChar());
        columns.push({
          x: i * FONT_SIZE,
          y: Math.random() * -canvas.height * 2,
          speed: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.15 + 0.03,
          chars,
          length,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createColumns();
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace`;

      columns.forEach((col) => {
        for (let i = 0; i < col.length; i++) {
          const y = col.y + i * FONT_SIZE;
          if (y < 0 || y > canvas.height) continue;

          // Head character is brighter
          const isHead = i === col.length - 1;
          const fade = isHead ? col.opacity * 4 : col.opacity * (1 - i / col.length);
          ctx.fillStyle = isHead
            ? `rgba(0, 255, 65, ${Math.min(fade, 0.6)})`
            : `rgba(0, 255, 65, ${fade})`;
          ctx.fillText(col.chars[i], col.x, y);

          // Randomly mutate characters
          if (Math.random() < 0.01) col.chars[i] = randomChar();
        }

        col.y += col.speed;
        if (col.y - col.length * FONT_SIZE > canvas.height) {
          col.y = Math.random() * -canvas.height;
          col.speed = Math.random() * 1.5 + 0.3;
          col.opacity = Math.random() * 0.15 + 0.03;
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
