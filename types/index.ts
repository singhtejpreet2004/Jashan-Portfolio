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
