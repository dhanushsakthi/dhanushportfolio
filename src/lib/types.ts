export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  shortIntro?: string;
  about: string;
  directorStatement?: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  githubUrl: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  portfolioUrl: string;
  photoUrl: string;
  resumePdfUrl: string;
  currentRole?: string;
  yearsExperience?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Web Development' | 'Database' | 'AI / Data' | 'Tools & Platforms' | string;
  iconName?: string;
  level?: string;
  description?: string;
  order: number;
  published?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  type: 'Full-time' | 'Freelance' | 'Internship' | 'Contract' | string;
  highlights: string[];
  technologies?: string[];
  order?: number;
  published?: boolean;
}

export type ProjectRole = 'Full-Stack Developer' | 'Frontend Developer' | 'Lead Developer' | 'Machine Learning Intern' | 'Web Developer' | 'Other' | string;
export type ProjectType = 'E-Commerce' | 'CMS' | 'AI / ML' | 'Client Work' | 'Web Application' | 'Other' | string;
export type VideoSourceType = 'youtube' | 'cloudinary' | 'none';

export interface Project {
  id: string;
  title: string;
  slug?: string;
  shortDescription: string;
  detailedDescription: string;
  logline?: string;
  category?: string;
  role: ProjectRole;
  projectType: ProjectType;
  year?: string | number;
  genre?: string;
  duration?: string;
  director?: string;
  credits?: string;
  cast?: string;
  crew?: string;
  poster?: string;
  imageUrl: string; // poster / primary image
  coverImage?: string;
  screenshots: string[]; // gallery images
  videoSourceType?: VideoSourceType;
  youtubeUrl?: string;
  youtubeVideoId?: string;
  cloudinaryPublicId?: string;
  cloudinaryUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  clientContext?: string;
  technologies?: string[];
  isFeatured: boolean;
  published?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Award {
  id: string;
  awardName: string;
  organization: string;
  filmProject?: string;
  category?: string;
  year: string;
  description?: string;
  certificateUrl?: string;
  position?: string;
  featured: boolean;
  published: boolean;
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
  published?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  score: string;
  startDate: string;
  endDate: string;
  details?: string;
}

export interface MediaItem {
  id: string;
  publicId: string;
  url: string;
  resourceType: 'image' | 'video' | string;
  fileName: string;
  size: number;
  folder?: string;
  createdAt: string;
  relatedProjectId?: string;
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
  maintenanceMode?: boolean;
  adminPasswordHash?: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  awards?: Award[];
  certifications: Certification[];
  education: Education[];
  media?: MediaItem[];
  siteSettings: SiteSettings;
}
