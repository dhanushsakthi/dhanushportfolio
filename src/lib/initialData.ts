import { PortfolioData } from './types';
import crypto from 'crypto';

// Helper to generate salt & hash for passwords
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'dhanush_salt_2026').digest('hex');
}

const DEFAULT_PASSWORD_HASH = hashPassword('dhanush123');

export const INITIAL_DATA: PortfolioData = {
  profile: {
    name: 'Dhanush S',
    headline: 'Film Director, Assistant Director & Creative Visual Storyteller',
    tagline: 'Crafting compelling cinematic narratives, high-impact short films, and visually captivating storytelling.',
    shortIntro: 'Passionate Film Director & Assistant Director with experience directing independent short films and assisting on major production projects.',
    about: 'Visionary film director and assistant director driven by continuous visual innovation, cinematic atmosphere, and deep narrative tension. Specialized in screenwriting, storyboarding, directing actors, on-set production management, visual aesthetics, and post-production workflow integration. Experienced in delivering compelling narratives for independent short films, music videos, and commercial concepts.',
    directorStatement: 'Filmmaking to me is the delicate art of capturing truth through light, sound, and motion. Every frame should carry intention, and every character choice should resonate with human emotion.',
    email: 'adhanush.sortfilm@gmail.com',
    phone: '+91 6379855062',
    location: 'Chennai / Nagapattinam, Tamil Nadu',
    linkedInUrl: 'https://www.linkedin.com/in/dhanushsakthivel',
    githubUrl: 'https://github.com/dhanushsakthi',
    instagramUrl: 'https://instagram.com/dhanush_director',
    youtubeUrl: 'https://youtube.com/@dhanushfilms',
    portfolioUrl: 'https://kmdfoodproducts.com/about.php',
    photoUrl: 'https://res.cloudinary.com/bf8afjz2/image/upload/v1/portfolio/profile/director_profile.jpg',
    resumePdfUrl: '/uploads/dhanush_resume.pdf',
    currentRole: 'Film Director & Assistant Director',
    yearsExperience: '3+ Years'
  },
  siteSettings: {
    siteTitle: 'Dhanush S | Director Portfolio & Admin CMS',
    metaDescription: 'Official Film Director & Assistant Director Portfolio of Dhanush S. Explore directed films, short films, assistant director projects, cinematic gallery, and awards.',
    keywords: ['Dhanush Director', 'Film Director Portfolio', 'Assistant Director', 'Short Films', 'Cinematic Portfolio', 'Tamil Cinema', 'Filmmaker'],
    theme: 'dark',
    maintenanceMode: false,
    adminPasswordHash: DEFAULT_PASSWORD_HASH
  },
  skills: [
    { id: 'sk-1', name: 'Film Direction', category: 'Direction', level: 'Expert', description: 'Visualizing scenes, blocking, actor direction, and cinematic tone control.', order: 1, published: true },
    { id: 'sk-2', name: 'Screenwriting & Scriptwriting', category: 'Screenwriting', level: 'Advanced', description: 'Crafting loglines, treatment documents, structure, and character dialog.', order: 2, published: true },
    { id: 'sk-3', name: 'Storyboarding & Shot Planning', category: 'Storyboarding', level: 'Advanced', description: 'Designing overhead blueprints, floorplans, and shot breakdowns.', order: 3, published: true },
    { id: 'sk-4', name: 'Assistant Direction & Continuity', category: 'Direction', level: 'Expert', description: 'Schedule management, call sheets, script continuity, and set management.', order: 4, published: true },
    { id: 'sk-5', name: 'Cinematography & Lighting', category: 'Cinematography', level: 'Advanced', description: 'Color palette design, mood lighting, camera movement, and frame composition.', order: 5, published: true },
    { id: 'sk-6', name: 'Video Editing & Color Grading', category: 'Editing', level: 'Advanced', description: 'DaVinci Resolve, Premiere Pro rhythm editing, pacing, and color pass.', order: 6, published: true },
    { id: 'sk-7', name: 'Visual Storytelling', category: 'Visual Storytelling', level: 'Expert', description: 'Translating subtext and emotion into visual motifs and symbolism.', order: 7, published: true },
    { id: 'sk-8', name: 'AI Filmmaking & Pre-Visualization', category: 'AI Filmmaking', level: 'Intermediate', description: 'AI concept art, prompt-assisted storyboards, and virtual location scouting.', order: 8, published: true },
    { id: 'sk-9', name: 'Sound Design & Score Curation', category: 'Editing', level: 'Advanced', description: 'Diegetic audio placement, atmospheric soundscapes, and tempo syncing.', order: 9, published: true },
    { id: 'sk-10', name: 'Java & Web Development', category: 'Programming', level: 'Advanced', description: 'Full-stack web architecture, React, Next.js, and automated CMS tools.', order: 10, published: true }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Film Director & Creative Lead',
      company: 'Independent Production',
      location: 'Chennai, Tamil Nadu',
      startDate: '2024',
      endDate: 'Present',
      isCurrent: true,
      type: 'Film Director',
      highlights: [
        'Wrote, directed, and edited independent short films and concept teasers.',
        'Managed pre-production casting, script revisions, location scouting, and shot lists.',
        'Supervised post-production color grading, sound design, and festival submissions.'
      ],
      technologies: ['Direction', 'Screenwriting', 'DaVinci Resolve', 'Premiere Pro'],
      order: 1,
      published: true
    },
    {
      id: 'exp-2',
      role: 'Assistant Director',
      company: 'Feature Film Production House',
      location: 'Chennai, Tamil Nadu',
      startDate: '2023',
      endDate: '2024',
      isCurrent: false,
      type: 'Assistant Director',
      highlights: [
        'Assisted the lead director during high-budget feature film schedule production.',
        'Prepared daily call sheets, scene breakdowns, actor blocking notes, and script continuity logs.',
        'Coordinated between direction team, camera department, art department, and talent on set.'
      ],
      technologies: ['Set Management', 'Call Sheets', 'Continuity Supervision', 'Actor Coordination'],
      order: 2,
      published: true
    },
    {
      id: 'exp-3',
      role: 'Full-Stack Developer & CMS Engineer',
      company: 'Auro Tech Solutions',
      location: 'Tamil Nadu, India',
      startDate: '2024',
      endDate: 'Present',
      isCurrent: true,
      type: 'Full-time',
      highlights: [
        'Engineered dynamic CMS applications, digital portfolios, and e-commerce platforms for 12+ clients.',
        'Integrated Cloudinary media pipelines and Firebase real-time database backends.'
      ],
      technologies: ['Next.js', 'React', 'Firebase', 'Cloudinary', 'Tailwind CSS'],
      order: 3,
      published: true
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'LOCK-IN',
      slug: 'lock-in',
      shortDescription: 'A gripping psychological thriller short film exploring isolation, ambition, and identity.',
      detailedDescription: 'LOCK-IN is an intensely crafted thriller short film directed by Dhanush. Set within a single claustrophobic location, the story follows an ambitious protagonist locked inside a high-security facility overnight. Featuring tight camera work, atmospheric lighting, and high tension sound design.',
      logline: 'An ambitious software engineer finds himself locked inside an abandoned research lab overnight, only to discover he is not alone.',
      role: 'Director',
      projectType: 'Directed Film',
      year: '2026',
      genre: 'Psychological Thriller',
      duration: '18 mins',
      director: 'Dhanush S',
      credits: 'Written & Directed by Dhanush S | Cinematography: R. Kumar | Music: A. Rahman',
      cast: 'Vikram Raj, Ananya Sen',
      crew: 'Sound: S. Karthik | Edit: Dhanush S',
      imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1600&q=80',
      videoSourceType: 'youtube',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtubeVideoId: 'dQw4w9WgXcQ',
      screenshots: [
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80'
      ],
      isFeatured: true,
      published: true,
      order: 1
    },
    {
      id: 'proj-2',
      title: 'SHADOWS OF CHENNAI',
      slug: 'shadows-of-chennai',
      shortDescription: 'Feature length neo-noir crime thriller showcasing the gritty underbelly of the metropolis.',
      detailedDescription: 'SHADOWS OF CHENNAI is a major feature film project where Dhanush served as First Assistant Director. Managed script continuity, shot breakdowns, call sheet logistics, and crowd scene control across 45 shoot days.',
      logline: 'An honest detective races against time to unravel a political conspiracy before dawn in the streets of Chennai.',
      role: 'Assistant Director',
      projectType: 'Assistant Director Work',
      year: '2025',
      genre: 'Action / Crime Thriller',
      duration: '142 mins',
      director: 'K. Senthil Nathan',
      credits: 'Lead Director: K. Senthil Nathan | 1st Assistant Director: Dhanush S',
      imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
      poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80',
      videoSourceType: 'youtube',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtubeVideoId: 'dQw4w9WgXcQ',
      screenshots: [
        'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80'
      ],
      isFeatured: true,
      published: true,
      order: 2
    },
    {
      id: 'proj-3',
      title: 'THE ECHO OF RAIN',
      slug: 'the-echo-of-rain',
      shortDescription: 'Poetic drama short film celebrating rural heritage, monsoon nostalgia, and human bonds.',
      detailedDescription: 'Directed and written by Dhanush, THE ECHO OF RAIN explores a grandfather and grandson navigating change in a coastal village during the rainy season. Shot on location with natural light aesthetics.',
      logline: 'During an unexpected monsoon storm, an elderly boat maker shares a forgotten secret with his grandson.',
      role: 'Director',
      projectType: 'Short Film',
      year: '2024',
      genre: 'Drama',
      duration: '12 mins',
      director: 'Dhanush S',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      videoSourceType: 'youtube',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtubeVideoId: 'dQw4w9WgXcQ',
      screenshots: [
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
      ],
      isFeatured: true,
      published: true,
      order: 3
    }
  ],
  awards: [
    {
      id: 'award-1',
      awardName: 'Best Director (Short Film)',
      organization: 'Chennai International Indie Film Festival',
      filmProject: 'LOCK-IN',
      category: 'Directing',
      year: '2026',
      description: 'Awarded for extraordinary visual atmosphere, pacing, and suspense control in independent short filmmaking.',
      certificateUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
      position: 'Winner',
      featured: true,
      published: true,
      order: 1
    },
    {
      id: 'award-2',
      awardName: 'Best Screenplay Award',
      organization: 'South India Short Film Conclave',
      filmProject: 'THE ECHO OF RAIN',
      category: 'Screenwriting',
      year: '2025',
      description: 'Recognized for poetic storytelling and nuanced character dialogue in drama.',
      certificateUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      position: 'Winner',
      featured: true,
      published: true,
      order: 2
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Cinematic Directing & Screenwriting Masterclass',
      issuer: 'Film Academy India',
      issueDate: '2025',
      imageUrl: '/certificates/agentic-ai.jpg',
      description: 'Certified in scene staging, narrative arching, actor communication, and camera placement techniques.',
      order: 1,
      published: true
    },
    {
      id: 'cert-2',
      title: 'Color Grading & DaVinci Resolve Workflow',
      issuer: 'Blackmagic Design Certified Training',
      issueDate: '2024',
      imageUrl: '/certificates/python.jpg',
      description: 'Professional certification in digital color correction, primary/secondary grading passes, and LUT design.',
      order: 2,
      published: true
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech Artificial Intelligence & Data Science',
      institution: 'AVS Engineering College',
      location: 'Salem, Tamil Nadu',
      score: 'CGPA: 8.5',
      startDate: '2023',
      endDate: 'Present',
      details: 'Combining technological innovation with creative digital media, AI filmmaking tools, and full-stack software development.'
    }
  ]
};
