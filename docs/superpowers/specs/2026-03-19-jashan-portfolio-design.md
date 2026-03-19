# Jashan Gupta — Portfolio Website Design Spec

## Overview

A single-page scroll portfolio website for Jashan Gupta, a Data Analyst. The site uses a cinematic dark-to-light alternating section design with smooth scroll-triggered animations. Content is managed via Sanity CMS so Jashan can update it without touching code.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| CMS | Sanity v3 (embedded Studio at `/studio`) |
| Deployment | Vercel (ISR) |
| Contact | Next.js API route → Resend (email) |

## Content Source — Resume

**Name:** Jashan Gupta
**Title:** Data Analyst
**Phone:** (+91) 9988930524
**Email:** jashangupta125@gmail.com
**LinkedIn:** https://www.linkedin.com/in/jashan-gupta6299a7251
**GitHub:** https://github.com/Jashan122005

**Education:** B.Tech (Hons) CSE — Big Data Analytics, Chandigarh University (Aug 2022 – Aug 2026)

**Experience:**
1. Data Analyst Intern — IndianGlobal Supply Chain Solutions (Jul 2025 – Oct 2025)
   - Built SQL-based ETL pipelines, improving data accuracy by ~25%
   - Designed and automated Power BI dashboards for real-time monitoring
   - Defined and tracked operational KPIs, improving decision turnaround by ~20%
   - Root cause analysis on delivery delays, ~10% operational efficiency improvement

2. Data Analyst Intern — Calypsotech Solutions (Jun 2024 – Aug 2024)
   - Analyzed large-scale research datasets, improving strategic planning by 15%
   - Automated KPI dashboards in Power BI, reducing manual reporting by ~30%
   - Analyzed 50K+ data records, presented findings to senior stakeholders

**Skills:**
- Analytics & BI: Power BI (DAX, RLS), Tableau, MS Excel
- Programming: Python, SQL, MySQL
- Libraries: pandas, NumPy, scikit-learn, Seaborn, Matplotlib
- Data Ops: ETL Pipelines, Data Cleaning, Data Wrangling, Data Modeling
- Analytical: KPI Design, Metrics Design, Segmentation, Root Cause Analysis
- Soft: Stakeholder Reporting, Strategic Storytelling, Cross-functional Collaboration

**Projects:**
1. ESG Reporting & Analytics (Sep 2025) — Benchmarked 50+ companies, risk model with 20% variance detection, interactive Power BI dashboard
2. Credit Card Customer Segmentation & Churn Analysis (Aug 2025) — 1.5M records, 5 segments, 90% accuracy churn model, C-level dashboard

**Research:**
1. Network Congestion Prediction using ML — ACROSET 2025 (published)
2. Snow Avalanche Detection using Remote Sensing — MIET Kumaon 2025
3. Role of AI in Healthcare — Manuscript in Progress

**Certifications:** Accenture, Oracle, TATA (x2), Deloitte, Microsoft, IBM, Google

**Achievements:**
- IEEE CUSB Coordinator (2022-2023)
- NASA SPACE APPS Challenge 2024 Finalist
- 3rd position Galaxy Gambit Innovation Challenge
- CodeRelay 2025 Finalist — IIT BHU

---

## Page Sections (Scroll Order)

### 1. Hero — Full Viewport (Dark: #0a0a0a)

- Sticky navbar at top: logo + section links (About, Experience, Projects, Contact), transparent → blurred on scroll
- Center: "DATA ANALYST" label in teal (#2dd4bf), letter-spaced
- Large bold name: "JASHAN GUPTA"
- Terminal-style tagline with blinking cursor: `$ Translating complex data into clear, actionable business recommendations_|`
- Subtle animated particle grid background (canvas or CSS)
- Resume PDF download button in navbar (sourced from Sanity `resumeFile`)
- Scroll-down bounce indicator at bottom
- **Animations:** Name reveals letter-by-letter, label fades from above, tagline types out, all sequenced

### 2. About (Light: #fafafa)

- Photo placeholder (Sanity image field) + bio paragraph
- Skill tags row below bio
- Education info
- **Animation:** Fade-in + slide-up on scroll enter

### 3. Skills (Dark: #111827)

- "Technical Arsenal" heading
- 2x3 grid of skill category cards with colored left borders
- Categories: Analytics & BI (teal), Programming (indigo), Libraries (amber), Data Ops (pink), Analytical Techniques (emerald), Communication (blue)
- **Animation:** Cards stagger in one-by-one with spring physics

### 4. Experience (Light: #fafafa)

- Vertical timeline with colored left border per role
- Each entry: date range, title, company, bullet achievements
- **Animation:** Each entry slides in from left on scroll

### 5. Projects (Dark: #0f172a) — Interactive Timeline

- Vertical gradient timeline line (teal → indigo → amber)
- Timeline dots pulse on scroll into view
- Each project: date, title, description, tech tags, GitHub link
- Click expands project card to show full details (works on both desktop and mobile)
- **Animation:** Cards fade + scale in on scroll, dots pulse

### 6. Research & Certifications (Light: #fafafa)

- Split layout: research papers on left, certification badges on right
- Research entries link to publications where available
- Certification badges as compact pills
- **Animation:** Fade-in + slide-up

### 7. Achievements (Dark: #111827)

- 2x2 bento grid of achievement cards with emoji icons
- Each card: icon, title, subtitle
- **Animation:** Cards scale up with spring physics on scroll

### 8. Contact (Dark gradient: #0a0a0a → #111827)

- "Let's Connect" heading + subtitle
- Contact form (Name, Email, Message) → API route → Resend email
- Social links: Email, LinkedIn, GitHub
- Footer with copyright
- **Animation:** Fade-in from below

---

## File Structure

```
jashan-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Main page, composes all sections
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx        # Sanity Studio embed
│   └── api/
│       └── contact/
│           └── route.ts        # Contact form → Resend email
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navbar with blur effect
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Research.tsx
│   │   ├── Achievements.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── ScrollReveal.tsx    # Reusable scroll-triggered animation wrapper
│   │   ├── TerminalText.tsx    # Typing effect component
│   │   ├── TimelineDot.tsx     # Pulsing timeline dot
│   │   ├── SkillCard.tsx       # Skill category card
│   │   └── SectionHeading.tsx  # Consistent section title styling
│   └── animations/
│       └── ParticleGrid.tsx    # Canvas-based particle background
├── sanity/
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── project.ts
│   │   ├── experience.ts
│   │   ├── skill.ts
│   │   ├── certification.ts
│   │   ├── research.ts
│   │   ├── achievement.ts
│   │   ├── about.ts            # Singleton: bio, photo, education
│   │   └── siteSettings.ts    # Singleton: name, title, tagline, socials
│   ├── lib/
│   │   ├── client.ts           # Sanity client config
│   │   ├── queries.ts          # GROQ queries
│   │   └── image.ts            # Image URL builder
│   └── sanity.config.ts
├── lib/
│   └── utils.ts                # Shared utilities
├── types/
│   └── index.ts                # TypeScript interfaces
├── styles/
│   └── globals.css             # Tailwind directives + custom CSS
├── public/
│   └── fonts/                  # Local font files if needed
├── tailwind.config.ts
├── next.config.ts
├── sanity.config.ts            # Root sanity config (re-exports)
├── sanity.cli.ts
├── package.json
├── tsconfig.json
├── .env.example
├── .env.local                  # gitignored
├── .gitignore
└── README.md
```

---

## Sanity Schemas

### siteSettings (singleton)
- `name`: string
- `title`: string (e.g., "Data Analyst")
- `tagline`: string
- `email`: string
- `phone`: string
- `linkedinUrl`: url
- `githubUrl`: url
- `resumeFile`: file (downloadable PDF)

### about (singleton)
- `photo`: image
- `bio`: text
- `education`: object { degree, institution, period }

### skill
- `category`: string
- `items`: array of strings
- `color`: string (hex accent color)
- `order`: number

### experience
- `company`: string
- `role`: string
- `period`: object { start: date, end: date } — display as "MMM YYYY"
- `achievements`: array of strings
- `order`: number

### project
- `title`: string
- `description`: text
- `date`: date
- `techStack`: array of strings
- `achievements`: array of strings
- `githubUrl`: url
- `liveUrl`: url
- `image`: image

### research
- `title`: string
- `venue`: string
- `year`: number
- `status`: string (published | in-progress)
- `link`: url

### certification
- `name`: string
- `issuer`: string
- `date`: date

### achievement
- `title`: string
- `subtitle`: string
- `icon`: string (emoji)
- `order`: number

---

## Animation Specifications

### Global: ScrollReveal wrapper
```
initial: { opacity: 0, y: 40 }
whileInView: { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: "easeOut" }
viewport: { once: true, margin: "-100px" }
```

### Hero sequence (orchestrated)
1. Particle grid fades in (0s)
2. "DATA ANALYST" label slides down (0.3s)
3. Name reveals letter-by-letter (0.5s, 50ms per letter)
4. Terminal tagline types out (1.2s, 30ms per character)
5. Scroll indicator bounces in (2s)

### Skills cards stagger
```
container: staggerChildren: 0.1
child: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }
```

### Project timeline
- Dots: scale 0 → 1 with spring (stiffness: 300, damping: 20)
- Cards: fade + slideX from alternating sides

### Achievement cards
```
whileInView: { scale: [0.8, 1.05, 1] }
transition: { type: "spring", stiffness: 200 }
```

### Navbar
- On scroll past hero: `backdrop-filter: blur(12px)`, background opacity transition

---

## API Route: Contact Form

`POST /api/contact`

Request body: `{ name: string, email: string, message: string }`

Validation: Zod schema. No rate limiting needed for a portfolio contact form.

Sends email via Resend SDK to Jashan's email address (from env var).

Returns: `{ success: boolean, error?: string }`

---

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=jashangupta125@gmail.com
```

---

## Deployment

- **Vercel:** Connect GitHub repo, auto-deploy on push to `main`
- **Sanity:** Free plan (100K API requests/month, 500K assets)
- **ISR:** Revalidate content every 60 seconds via `revalidate: 60` in fetch calls
- **Domain:** Custom domain via Vercel (optional)

---

## Design Tokens

| Token | Value |
|---|---|
| Dark BG Primary | #0a0a0a |
| Dark BG Secondary | #111827 |
| Dark BG Tertiary | #0f172a |
| Light BG | #fafafa |
| Card BG | #1e293b |
| Text Primary (dark) | #e0e0e0 |
| Text Primary (light) | #1a1a1a |
| Text Secondary | #888888 |
| Accent Teal | #2dd4bf |
| Accent Indigo | #818cf8 |
| Accent Amber | #f59e0b |
| Accent Pink | #f472b6 |
| Font Heading | Inter (700) |
| Font Body | Inter (400) |
| Font Mono | JetBrains Mono |
