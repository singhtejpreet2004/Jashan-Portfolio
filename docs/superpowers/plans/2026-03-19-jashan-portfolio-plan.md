# Jashan Gupta Portfolio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scroll portfolio website for Jashan Gupta with Sanity CMS, Framer Motion animations, and deploy-ready Next.js 14 architecture.

**Architecture:** Next.js 14 App Router with TypeScript serves a single-page portfolio. Sanity v3 provides headless CMS with embedded Studio at `/studio`. Framer Motion powers scroll-triggered animations. Content is fetched via GROQ queries with ISR revalidation.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion v11, Sanity v3, Resend, Vercel

**Spec:** `docs/superpowers/specs/2026-03-19-jashan-portfolio-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout: fonts (Inter, JetBrains Mono), metadata, global styles |
| `app/page.tsx` | Main page: fetches all Sanity data, composes section components |
| `app/studio/[[...tool]]/page.tsx` | Sanity Studio embed (client component) |
| `app/api/contact/route.ts` | POST handler: Zod validation → Resend email |
| `components/layout/Navbar.tsx` | Sticky navbar: transparent → blurred, section links, resume download |
| `components/layout/Footer.tsx` | Copyright footer |
| `components/sections/Hero.tsx` | Full-viewport hero: terminal text, particle grid, scroll indicator |
| `components/sections/About.tsx` | Photo + bio + education + skill tags |
| `components/sections/Skills.tsx` | 2x3 skill category cards with stagger animation |
| `components/sections/Experience.tsx` | Timeline with colored borders per role |
| `components/sections/Projects.tsx` | Interactive vertical timeline, expandable cards |
| `components/sections/Research.tsx` | Split: research papers + certification badges |
| `components/sections/Achievements.tsx` | 2x2 bento grid with spring animations |
| `components/sections/Contact.tsx` | Contact form + social links |
| `components/ui/ScrollReveal.tsx` | Reusable Framer Motion scroll-triggered wrapper |
| `components/ui/TerminalText.tsx` | Typing effect with blinking cursor |
| `components/ui/TimelineDot.tsx` | Pulsing dot for timeline |
| `components/ui/SkillCard.tsx` | Skill category card with colored accent |
| `components/ui/SectionHeading.tsx` | Consistent section title component |
| `components/animations/ParticleGrid.tsx` | Canvas particle grid background |
| `sanity/schemas/*.ts` | 8 Sanity schemas (siteSettings, about, skill, experience, project, research, certification, achievement) |
| `sanity/schemas/index.ts` | Schema registry |
| `sanity/lib/client.ts` | Sanity client with ISR config |
| `sanity/lib/queries.ts` | All GROQ queries |
| `sanity/lib/image.ts` | Image URL builder |
| `sanity.config.ts` | Root Sanity config |
| `sanity.cli.ts` | Sanity CLI config |
| `types/index.ts` | TypeScript interfaces for all content types |
| `lib/utils.ts` | cn() helper, date formatter |
| `styles/globals.css` | Tailwind directives, custom animations, design tokens as CSS vars |
| `tailwind.config.ts` | Extended theme with design tokens |
| `next.config.ts` | Sanity image domain, redirects |

---

### Task 1: Project Scaffold & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `styles/globals.css`, `.env.example`, `.env.local`, `.gitignore`, `postcss.config.mjs`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/tejpreetsingh/Development/experiments/Jashan_Resume
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Answer prompts: Yes to all defaults. This creates the base Next.js 14 project in the current directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion next-sanity @sanity/image-url @sanity/vision sanity resend zod clsx tailwind-merge
npm install -D @types/node
```

- [ ] **Step 3: Configure Tailwind with design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#0a0a0a",
          secondary: "#111827",
          tertiary: "#0f172a",
        },
        light: {
          bg: "#fafafa",
        },
        card: "#1e293b",
        accent: {
          teal: "#2dd4bf",
          indigo: "#818cf8",
          amber: "#f59e0b",
          pink: "#f472b6",
          emerald: "#34d399",
          blue: "#60a5fa",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Set up globals.css**

Replace `styles/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-dark-primary text-gray-200 antialiased;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r;
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
```

- [ ] **Step 5: Create .env.example and .gitignore**

`.env.example`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=jashangupta125@gmail.com
```

Ensure `.gitignore` includes: `.env`, `.env.local`, `node_modules/`, `.next/`, `.superpowers/`

- [ ] **Step 6: Create lib/utils.ts**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
```

- [ ] **Step 7: Create types/index.ts**

```typescript
export interface SiteSettings {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeFileUrl?: string;
}

export interface About {
  photo?: {
    asset: { _ref: string };
    alt?: string;
  };
  bio: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  };
}

export interface Skill {
  _id: string;
  category: string;
  items: string[];
  color: string;
  order: number;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  period: { start: string; end: string };
  achievements: string[];
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  date: string;
  techStack: string[];
  achievements: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: {
    asset: { _ref: string };
    alt?: string;
  };
}

export interface Research {
  _id: string;
  title: string;
  venue: string;
  year: number;
  status: "published" | "in-progress";
  link?: string;
}

export interface Certification {
  _id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Achievement {
  _id: string;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
}
```

- [ ] **Step 8: Set up root layout with fonts**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Jashan Gupta — Data Analyst",
  description:
    "Data Analyst specializing in SQL, Python, Power BI, and ETL pipelines. Turning complex data into actionable business insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 project with Tailwind, Framer Motion, Sanity deps"
```

---

### Task 2: Sanity CMS Setup & Schemas

**Files:**
- Create: `sanity.config.ts`, `sanity.cli.ts`, `sanity/schemas/index.ts`, `sanity/schemas/siteSettings.ts`, `sanity/schemas/about.ts`, `sanity/schemas/skill.ts`, `sanity/schemas/experience.ts`, `sanity/schemas/project.ts`, `sanity/schemas/research.ts`, `sanity/schemas/certification.ts`, `sanity/schemas/achievement.ts`, `sanity/lib/client.ts`, `sanity/lib/queries.ts`, `sanity/lib/image.ts`, `app/studio/[[...tool]]/page.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Create sanity.config.ts (root)**

```typescript
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "jashan-portfolio",
  title: "Jashan Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
```

- [ ] **Step 2: Create sanity.cli.ts**

```typescript
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  },
});
```

- [ ] **Step 3: Create all 8 Sanity schemas**

`sanity/schemas/siteSettings.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "resumeFile", title: "Resume PDF", type: "file" }),
  ],
});
```

`sanity/schemas/about.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({
      name: "education",
      title: "Education",
      type: "object",
      fields: [
        defineField({ name: "degree", title: "Degree", type: "string" }),
        defineField({ name: "institution", title: "Institution", type: "string" }),
        defineField({ name: "period", title: "Period", type: "string" }),
      ],
    }),
  ],
});
```

`sanity/schemas/skill.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "category", title: "Category", type: "string", validation: (r) => r.required() }),
    defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "color", title: "Accent Color (hex)", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
```

`sanity/schemas/experience.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "period",
      title: "Period",
      type: "object",
      fields: [
        defineField({ name: "start", title: "Start Date", type: "date" }),
        defineField({ name: "end", title: "End Date", type: "date" }),
      ],
    }),
    defineField({ name: "achievements", title: "Achievements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
```

`sanity/schemas/project.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "techStack", title: "Tech Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "achievements", title: "Achievements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
});
```

`sanity/schemas/research.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "research",
  title: "Research",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [{ title: "Published", value: "published" }, { title: "In Progress", value: "in-progress" }] },
    }),
    defineField({ name: "link", title: "Link", type: "url" }),
  ],
});
```

`sanity/schemas/certification.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date" }),
  ],
});
```

`sanity/schemas/achievement.ts`:
```typescript
import { defineType, defineField } from "sanity";

export default defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
```

`sanity/schemas/index.ts`:
```typescript
import siteSettings from "./siteSettings";
import about from "./about";
import skill from "./skill";
import experience from "./experience";
import project from "./project";
import research from "./research";
import certification from "./certification";
import achievement from "./achievement";

export const schemaTypes = [
  siteSettings,
  about,
  skill,
  experience,
  project,
  research,
  certification,
  achievement,
];
```

- [ ] **Step 4: Create Sanity client, queries, and image builder**

`sanity/lib/client.ts`:
```typescript
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
});
```

`sanity/lib/queries.ts`:
```typescript
import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, title, tagline, email, phone, linkedinUrl, githubUrl,
  "resumeFileUrl": resumeFile.asset->url
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  photo, bio, education
}`;

export const skillsQuery = groq`*[_type == "skill"] | order(order asc){
  _id, category, items, color, order
}`;

export const experiencesQuery = groq`*[_type == "experience"] | order(order asc){
  _id, company, role, period, achievements, order
}`;

export const projectsQuery = groq`*[_type == "project"] | order(date desc){
  _id, title, description, date, techStack, achievements, githubUrl, liveUrl, image
}`;

export const researchQuery = groq`*[_type == "research"] | order(year desc){
  _id, title, venue, year, status, link
}`;

export const certificationsQuery = groq`*[_type == "certification"] | order(date desc){
  _id, name, issuer, date
}`;

export const achievementsQuery = groq`*[_type == "achievement"] | order(order asc){
  _id, title, subtitle, icon, order
}`;
```

`sanity/lib/image.ts`:
```typescript
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}
```

- [ ] **Step 5: Create Sanity Studio page**

`app/studio/[[...tool]]/page.tsx`:
```tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 6: Update next.config.ts for Sanity images**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 7: Commit Sanity setup**

```bash
git add sanity/ sanity.config.ts sanity.cli.ts app/studio/ next.config.ts
git commit -m "feat: add Sanity CMS schemas, client, queries, and Studio embed"
```

---

### Task 3: Reusable UI Components

**Files:**
- Create: `components/ui/ScrollReveal.tsx`, `components/ui/TerminalText.tsx`, `components/ui/TimelineDot.tsx`, `components/ui/SkillCard.tsx`, `components/ui/SectionHeading.tsx`, `components/animations/ParticleGrid.tsx`

- [ ] **Step 1: Create ScrollReveal wrapper**

`components/ui/ScrollReveal.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create TerminalText component**

`components/ui/TerminalText.tsx`:
```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TerminalTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TerminalText({
  text,
  className,
  delay = 0,
  speed = 30,
}: TerminalTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

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
      <span className={`text-accent-teal ${showCursor ? "animate-blink" : ""}`}>
        |
      </span>
    </span>
  );
}
```

- [ ] **Step 3: Create TimelineDot component**

`components/ui/TimelineDot.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

interface TimelineDotProps {
  color: string;
}

export default function TimelineDot({ color }: TimelineDotProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
      className="absolute -left-[21px] top-1 w-3 h-3 rounded-full z-10"
      style={{ backgroundColor: color }}
    />
  );
}
```

- [ ] **Step 4: Create SkillCard component**

`components/ui/SkillCard.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card p-4 rounded-lg border-l-[3px]"
      style={{ borderLeftColor: skill.color }}
    >
      <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: skill.color }}>
        {skill.category}
      </div>
      <div className="text-sm text-gray-300">
        {skill.items.join(" · ")}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 5: Create SectionHeading component**

`components/ui/SectionHeading.tsx`:
```tsx
import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light }: SectionHeadingProps) {
  return (
    <ScrollReveal className="mb-12 text-center">
      <h2 className={`text-3xl md:text-4xl font-heading font-bold ${light ? "text-gray-900" : "text-white"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg ${light ? "text-gray-600" : "text-gray-400"}`}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
```

- [ ] **Step 6: Create ParticleGrid animation**

`components/animations/ParticleGrid.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const PARTICLE_COUNT = 50;
    const CONNECTION_DISTANCE = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.3)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.15 * (1 - dist / CONNECTION_DISTANCE)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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
```

- [ ] **Step 7: Commit UI components**

```bash
git add components/
git commit -m "feat: add reusable UI components — ScrollReveal, TerminalText, ParticleGrid, SkillCard"
```

---

### Task 4: Navbar & Footer

**Files:**
- Create: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`

- [ ] **Step 1: Create Navbar**

`components/layout/Navbar.tsx`:
```tsx
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

interface NavbarProps {
  settings: SiteSettings;
}

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
        scrolled
          ? "bg-dark-primary/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-lg text-white">
          JG<span className="text-accent-teal">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          {settings.resumeFileUrl && (
            <a
              href={settings.resumeFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 border border-accent-teal text-accent-teal rounded hover:bg-accent-teal/10 transition-colors"
            >
              Resume
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-400"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-primary/95 backdrop-blur-xl border-b border-white/5 px-6 py-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          {settings.resumeFileUrl && (
            <a
              href={settings.resumeFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-accent-teal"
            >
              Resume ↗
            </a>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
```

- [ ] **Step 2: Create Footer**

`components/layout/Footer.tsx`:
```tsx
export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-600 font-mono">
      &copy; {new Date().getFullYear()} Jashan Gupta. All rights reserved.
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/
git commit -m "feat: add Navbar with blur scroll effect and Footer"
```

---

### Task 5: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero section**

`components/sections/Hero.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import ParticleGrid from "@/components/animations/ParticleGrid";
import TerminalText from "@/components/ui/TerminalText";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const nameLetters = settings.name.split("");

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-primary">
      <ParticleGrid />

      <div className="relative z-10 text-center px-6">
        {/* Title label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-accent-teal text-sm md:text-base tracking-[4px] uppercase font-mono mb-4"
        >
          {settings.title}
        </motion.div>

        {/* Name - letter by letter */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tight">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Terminal tagline */}
        <div className="mt-6 max-w-xl mx-auto font-mono text-sm md:text-base text-gray-500">
          <TerminalText text={settings.tagline} delay={1.2} speed={30} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 animate-bounce-slow"
      >
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 4v16m0 0l-4-4m4 4l4-4" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with letter reveal, terminal text, particle grid"
```

---

### Task 6: About & Skills Sections

**Files:**
- Create: `components/sections/About.tsx`, `components/sections/Skills.tsx`

- [ ] **Step 1: Create About section**

`components/sections/About.tsx`:
```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/image";
import type { About as AboutType } from "@/types";

interface AboutProps {
  about: AboutType;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="About Me" light />

        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {about.photo && (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                <Image
                  src={urlFor(about.photo).width(320).height(320).url()}
                  alt={about.photo.alt || "Jashan Gupta"}
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {about.bio}
              </p>

              {about.education && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Education</div>
                  <div className="font-semibold text-gray-900">{about.education.degree}</div>
                  <div className="text-sm text-gray-600">
                    {about.education.institution} | {about.education.period}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Skills section**

`components/sections/Skills.tsx`:
```tsx
"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";
import type { Skill } from "@/types";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-20 md:py-28 bg-dark-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Technical Arsenal" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill._id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx components/sections/Skills.tsx
git commit -m "feat: add About and Skills sections"
```

---

### Task 7: Experience & Projects Sections

**Files:**
- Create: `components/sections/Experience.tsx`, `components/sections/Projects.tsx`

- [ ] **Step 1: Create Experience section**

`components/sections/Experience.tsx`:
```tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineDot from "@/components/ui/TimelineDot";
import { formatDate } from "@/lib/utils";
import type { Experience as ExperienceType } from "@/types";

const TIMELINE_COLORS = ["#2dd4bf", "#818cf8", "#f59e0b", "#f472b6"];

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Work Experience" light />

        <div className="relative pl-8 space-y-10">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />

          {experiences.map((exp, i) => (
            <ScrollReveal key={exp._id} direction="left" delay={i * 0.1}>
              <div className="relative">
                <TimelineDot color={TIMELINE_COLORS[i % TIMELINE_COLORS.length]} />
                <div
                  className="border-l-2 pl-4"
                  style={{ borderLeftColor: TIMELINE_COLORS[i % TIMELINE_COLORS.length] }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: TIMELINE_COLORS[i % TIMELINE_COLORS.length] }}
                  >
                    {formatDate(exp.period.start)} — {formatDate(exp.period.end)}
                  </div>
                  <div className="text-lg font-bold text-gray-900 mt-1">{exp.role}</div>
                  <div className="text-sm text-gray-500">{exp.company}</div>
                  <ul className="mt-3 space-y-1">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-400 mt-1">—</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Projects section with interactive timeline**

`components/sections/Projects.tsx`:
```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineDot from "@/components/ui/TimelineDot";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

const DOT_COLORS = ["#2dd4bf", "#818cf8", "#f59e0b", "#f472b6"];

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 bg-dark-tertiary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Projects" />

        <div className="relative pl-8 space-y-8">
          {/* Gradient timeline line */}
          <div
            className="absolute left-3 top-0 bottom-0 w-0.5"
            style={{
              background: "linear-gradient(to bottom, #2dd4bf, #818cf8, #f59e0b)",
            }}
          />

          {projects.map((project, i) => {
            const isExpanded = expandedId === project._id;
            const color = DOT_COLORS[i % DOT_COLORS.length];

            return (
              <ScrollReveal key={project._id} delay={i * 0.15}>
                <div className="relative">
                  <TimelineDot color={color} />

                  <motion.div
                    layout
                    onClick={() => setExpandedId(isExpanded ? null : project._id)}
                    className="bg-card p-5 rounded-xl cursor-pointer border transition-colors"
                    style={{ borderColor: isExpanded ? color + "66" : color + "22" }}
                    whileHover={{ borderColor: color + "44" }}
                  >
                    <div className="text-xs font-mono" style={{ color }}>
                      {formatDate(project.date)}
                    </div>
                    <div className="text-lg font-bold text-white mt-1">{project.title}</div>
                    <p className="text-sm text-gray-400 mt-2">{project.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: color + "22", color }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/10">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                              Key Achievements
                            </div>
                            <ul className="space-y-1">
                              {project.achievements.map((a, j) => (
                                <li key={j} className="text-sm text-gray-300 flex gap-2">
                                  <span className="text-accent-teal">●</span>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex gap-3 mt-4">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-3 py-1.5 border border-white/20 rounded text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  GitHub ↗
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-3 py-1.5 bg-accent-teal/10 border border-accent-teal/30 rounded text-accent-teal hover:bg-accent-teal/20 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Live Demo ↗
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Experience.tsx components/sections/Projects.tsx
git commit -m "feat: add Experience timeline and interactive Projects section"
```

---

### Task 8: Research, Achievements & Contact Sections

**Files:**
- Create: `components/sections/Research.tsx`, `components/sections/Achievements.tsx`, `components/sections/Contact.tsx`

- [ ] **Step 1: Create Research section**

`components/sections/Research.tsx`:
```tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Research as ResearchType, Certification } from "@/types";

interface ResearchProps {
  research: ResearchType[];
  certifications: Certification[];
}

export default function Research({ research, certifications }: ResearchProps) {
  return (
    <section id="research" className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Research & Certifications" light />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Research */}
          <ScrollReveal>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Research</h3>
              <div className="space-y-4">
                {research.map((r) => (
                  <div key={r._id} className="bg-white p-4 rounded-lg border border-gray-100">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{r.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{r.venue} — {r.year}</div>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                          r.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {r.status === "published" ? "Published" : "In Progress"}
                      </span>
                    </div>
                    {r.link && (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-teal hover:underline mt-2 inline-block"
                      >
                        View Paper ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert._id}
                    className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full border border-gray-200"
                    title={cert.name}
                  >
                    {cert.issuer} — {cert.name}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Achievements section**

`components/sections/Achievements.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Achievement } from "@/types";

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="py-20 md:py-28 bg-dark-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Achievements" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((a, i) => (
            <motion.div
              key={a._id}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-5 rounded-xl text-center"
            >
              <div className="text-3xl mb-2">{a.icon}</div>
              <div className="font-bold text-white text-sm">{a.title}</div>
              <div className="text-xs text-gray-400 mt-1">{a.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Contact section**

`components/sections/Contact.tsx`:
```tsx
"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
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
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(#0a0a0a, #111827)" }}
    >
      <div className="max-w-2xl mx-auto px-6">
        <SectionHeading
          title="Let's Connect"
          subtitle="Open to opportunities in data analytics & business intelligence"
        />

        <ScrollReveal>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal/50 transition-colors"
            />
            <textarea
              placeholder="Your Message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal/50 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 bg-accent-teal text-dark-primary font-semibold rounded-lg hover:bg-accent-teal/90 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-4 mt-8">
            <a
              href={`mailto:${settings.email}`}
              className="px-4 py-2 bg-card border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-accent-teal/30 transition-colors"
            >
              ✉ Email
            </a>
            {settings.linkedinUrl && (
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-card border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-accent-teal/30 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {settings.githubUrl && (
              <a
                href={settings.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-card border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-accent-teal/30 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/Research.tsx components/sections/Achievements.tsx components/sections/Contact.tsx
git commit -m "feat: add Research, Achievements, and Contact sections"
```

---

### Task 9: Contact API Route

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create contact API route**

`app/api/contact/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = schema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/contact/route.ts
git commit -m "feat: add contact form API route with Zod validation and Resend"
```

---

### Task 10: Main Page — Compose Everything

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create main page with all data fetching**

`app/page.tsx`:
```tsx
import { client } from "@/sanity/lib/client";
import {
  siteSettingsQuery,
  aboutQuery,
  skillsQuery,
  experiencesQuery,
  projectsQuery,
  researchQuery,
  certificationsQuery,
  achievementsQuery,
} from "@/sanity/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import type {
  SiteSettings,
  About as AboutType,
  Skill,
  Experience as ExperienceType,
  Project,
  Research as ResearchType,
  Certification,
  Achievement,
} from "@/types";

export const revalidate = 60;

async function getData() {
  const [settings, about, skills, experiences, projects, research, certifications, achievements] =
    await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<AboutType>(aboutQuery),
      client.fetch<Skill[]>(skillsQuery),
      client.fetch<ExperienceType[]>(experiencesQuery),
      client.fetch<Project[]>(projectsQuery),
      client.fetch<ResearchType[]>(researchQuery),
      client.fetch<Certification[]>(certificationsQuery),
      client.fetch<Achievement[]>(achievementsQuery),
    ]);

  return { settings, about, skills, experiences, projects, research, certifications, achievements };
}

export default async function Home() {
  const { settings, about, skills, experiences, projects, research, certifications, achievements } =
    await getData();

  return (
    <main>
      <Navbar settings={settings} />
      <Hero settings={settings} />
      <About about={about} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Research research={research} certifications={certifications} />
      <Achievements achievements={achievements} />
      <Contact settings={settings} />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify build compiles**

```bash
npx next build
```

Expected: Build succeeds (Sanity queries will return null/empty without data, but components should handle that gracefully).

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose main page with all sections and Sanity data fetching"
```

---

### Task 11: GitHub Repository & Deploy Prep

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Ensure .gitignore is complete**

Verify `.gitignore` contains:
```
.env
.env.local
node_modules/
.next/
.superpowers/
*.log
.DS_Store
```

- [ ] **Step 2: Create GitHub repository and push**

```bash
cd /Users/tejpreetsingh/Development/experiments/Jashan_Resume
gh repo create Jashan-Portfolio --public --source=. --push
```

- [ ] **Step 3: Verify on GitHub**

```bash
gh repo view --web
```

- [ ] **Step 4: Final commit if any remaining changes**

```bash
git status
# If clean, skip. Otherwise:
git add -A
git commit -m "chore: finalize project for deployment"
git push origin main
```
