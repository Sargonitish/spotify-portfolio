export interface Skill {
  id: number;
  name: string;
  proficiency: number;
  experience: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  category: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface Certification {
  id: number;
  title: string;
  organization: string;
  date: string;
  credentialUrl: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  introduction: string;
  bio: string;
  education: string;
  interests: string[];
  careerGoals: string;
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
  resumeUrl: string;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
}
