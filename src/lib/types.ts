export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  photoUrl: string;
  resumePdfUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Web Development' | 'Database' | 'AI / Data' | 'Tools & Platforms';
  iconName?: string;
  level?: string;
  order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  type: 'Full-time' | 'Freelance' | 'Internship';
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  category: 'E-Commerce' | 'CMS' | 'AI / ML' | 'Full-Stack' | 'Client Work';
  technologies: string[];
  role: string;
  clientContext: string; // e.g., "Auto Tech Solutions" or "Freelance Client"
  imageUrl: string;
  screenshots: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  isFeatured: boolean;
  order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  imageUrl: string;
  pdfUrl?: string;
  verificationUrl?: string;
  description?: string;
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  score: string; // e.g., "CGPA: 8.5" or "Percentage: 66.17%"
  startDate: string;
  endDate: string;
  details?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string[];
  theme: 'dark' | 'light' | 'system';
  adminPasswordHash?: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  siteSettings: SiteSettings;
}
