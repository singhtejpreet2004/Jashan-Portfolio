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

const fallbackSettings: SiteSettings = {
  name: "Jashan Gupta",
  title: "Data Analyst",
  tagline: "Translating complex data into clear, actionable business recommendations",
  email: "jashangupta125@gmail.com",
  phone: "(+91) 9988930524",
  linkedinUrl: "https://www.linkedin.com/in/jashan-gupta6299a7251",
  githubUrl: "https://github.com/Jashan122005",
};

const fallbackAbout: AboutType = {
  bio: "Data Analyst with strong hands-on experience in SQL, Python, Power BI, Tableau, and Excel, specializing in data cleaning, KPI design, ETL pipelines, and dashboard-driven insights. Proven track record of analyzing large datasets, identifying trends, performing root cause analysis, and delivering executive-ready reports across logistics, e-commerce, and analytics-driven domains.",
  education: {
    degree: "B.Tech (Hons) — Computer Science & Engineering (Big Data Analytics)",
    institution: "Chandigarh University, Punjab",
    period: "August 2022 – August 2026",
  },
};

const fallbackSkills: Skill[] = [
  { _id: "1", category: "Analytics & BI", items: ["Power BI (DAX, RLS)", "Tableau", "MS Excel"], color: "#2dd4bf", order: 1 },
  { _id: "2", category: "Programming", items: ["Python", "SQL", "MySQL"], color: "#818cf8", order: 2 },
  { _id: "3", category: "Libraries", items: ["pandas", "NumPy", "scikit-learn", "Seaborn", "Matplotlib"], color: "#f59e0b", order: 3 },
  { _id: "4", category: "Data Operations", items: ["ETL Pipelines", "Data Cleaning", "Data Wrangling", "Data Modeling"], color: "#f472b6", order: 4 },
  { _id: "5", category: "Analytical Techniques", items: ["KPI Design & Tracking", "Metrics Design", "Segmentation", "Root Cause Analysis"], color: "#34d399", order: 5 },
  { _id: "6", category: "Communication", items: ["Stakeholder Reporting", "Strategic Storytelling", "Cross-functional Collaboration"], color: "#60a5fa", order: 6 },
];

const fallbackExperiences: ExperienceType[] = [
  {
    _id: "1", company: "IndianGlobal Supply Chain Solutions", role: "Data Analyst Intern",
    period: { start: "2025-07-01", end: "2025-10-01" }, order: 1,
    achievements: [
      "Built SQL-based ETL pipelines to extract, clean, and transform logistics data, improving data accuracy by ~25%",
      "Designed and automated Power BI dashboards for real-time operational monitoring and performance tracking",
      "Defined and tracked key operational KPIs, improving decision turnaround time by ~20%",
      "Conducted root cause analysis on delivery delays, contributing to a ~10% improvement in operational efficiency",
    ],
  },
  {
    _id: "2", company: "Calypsotech Solutions", role: "Data Analyst Intern",
    period: { start: "2024-06-01", end: "2024-08-01" }, order: 2,
    achievements: [
      "Analyzed large-scale research datasets, identifying trends that improved strategic planning by 15%",
      "Designed and automated KPI dashboards in Power BI, reducing manual reporting effort by ~30%",
      "Analyzed 50K+ data records to identify performance trends and presented findings to senior stakeholders",
    ],
  },
];

const fallbackProjects: Project[] = [
  {
    _id: "1", title: "ESG Reporting & Analytics", date: "2025-09-01",
    description: "Comprehensive ESG analytics platform benchmarking 50+ companies across sustainability metrics and governance controls.",
    techStack: ["Python", "Power BI", "SQL", "pandas"],
    achievements: [
      "Benchmarked ESG performance for 50+ companies to identify gaps across sustainability metrics and governance controls",
      "Developed a risk-assessment model that uncovered a 20% variance in ESG compliance",
      "Built and deployed an interactive Power BI dashboard integrating multi-source ESG datasets",
    ],
  },
  {
    _id: "2", title: "Credit Card Customer Segmentation & Churn Analysis", date: "2025-08-01",
    description: "End-to-end customer analytics on a 1.5M-record credit card dataset with predictive churn modeling.",
    techStack: ["Python", "scikit-learn", "Power BI", "SQL"],
    achievements: [
      "Engineered a customer segmentation model on a 1.5M-record dataset, identifying 5 primary customer segments",
      "Designed a predictive churn model achieving 90% accuracy",
      "Built a C-level Power BI dashboard translating complex analytics into actionable business insights",
    ],
  },
];

const fallbackResearch: ResearchType[] = [
  { _id: "1", title: "Network Congestion Prediction using Machine Learning", venue: "ACROSET 2025", year: 2025, status: "published" },
  { _id: "2", title: "Snow Avalanche Detection using Remote Sensing", venue: "MIET Kumaon International Conference 2025", year: 2025, status: "published" },
  { _id: "3", title: "Role of AI in Healthcare", venue: "Manuscript in Progress", year: 2025, status: "in-progress" },
];

const fallbackCertifications: Certification[] = [
  { _id: "1", name: "Data Analytics & Visualization – Job Simulation", issuer: "Accenture", date: "2024-04-01" },
  { _id: "2", name: "What is Generative AI", issuer: "Oracle", date: "2024-07-01" },
  { _id: "3", name: "Data Vis: Empowering Business with Effective Insights", issuer: "TATA", date: "2025-05-01" },
  { _id: "4", name: "Data Analytics Job Simulation", issuer: "Deloitte", date: "2025-06-01" },
  { _id: "5", name: "GenAI Powered Data Analytics Job Simulation", issuer: "TATA", date: "2025-07-01" },
  { _id: "6", name: "Prepare Data for Data Analysis", issuer: "Microsoft", date: "2025-07-01" },
  { _id: "7", name: "Introduction to Business Intelligence", issuer: "IBM", date: "2025-07-01" },
  { _id: "8", name: "Foundation of Business Intelligence", issuer: "Google", date: "2025-07-01" },
];

const fallbackAchievements: Achievement[] = [
  { _id: "1", title: "NASA SPACE APPS", subtitle: "2024 Finalist", icon: "🏆", order: 1 },
  { _id: "2", title: "Galaxy Gambit", subtitle: "3rd Position", icon: "🥉", order: 2 },
  { _id: "3", title: "CodeRelay 2025", subtitle: "IIT BHU Finalist", icon: "💻", order: 3 },
  { _id: "4", title: "IEEE CUSB", subtitle: "Coordinator 2022-23", icon: "⚡", order: 4 },
];

async function getData() {
  if (!client) {
    return {
      settings: fallbackSettings,
      about: fallbackAbout,
      skills: fallbackSkills,
      experiences: fallbackExperiences,
      projects: fallbackProjects,
      research: fallbackResearch,
      certifications: fallbackCertifications,
      achievements: fallbackAchievements,
    };
  }

  try {
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

    return {
      settings: settings || fallbackSettings,
      about: about || fallbackAbout,
      skills: skills?.length ? skills : fallbackSkills,
      experiences: experiences?.length ? experiences : fallbackExperiences,
      projects: projects?.length ? projects : fallbackProjects,
      research: research?.length ? research : fallbackResearch,
      certifications: certifications?.length ? certifications : fallbackCertifications,
      achievements: achievements?.length ? achievements : fallbackAchievements,
    };
  } catch {
    return {
      settings: fallbackSettings,
      about: fallbackAbout,
      skills: fallbackSkills,
      experiences: fallbackExperiences,
      projects: fallbackProjects,
      research: fallbackResearch,
      certifications: fallbackCertifications,
      achievements: fallbackAchievements,
    };
  }
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
