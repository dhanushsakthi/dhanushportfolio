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
    headline: 'Full-Stack Web Developer & AI/Data Science Specialist',
    tagline: 'Building high-performance e-commerce platforms, custom CMS solutions, and intelligent AI applications.',
    shortIntro: 'Initiative-driven developer with hands-on experience developing CMS platforms, e-commerce platforms, full-stack web applications, and AI models.',
    about: 'Initiative-driven developer with hands-on experience developing CMS platforms, e-commerce platforms, full-stack web applications, intelligent software solutions, and business automation systems for 12+ real-world clients. Strong foundation in Python, Java, SQL, API integration, database management, and machine learning with practical development experience. Driven by continuous improvement, technical problem-solving, and building efficient, scalable, user-focused solutions.',
    email: 'ns.dhanushsakthivel@gmail.com',
    phone: '+91 6379855062',
    location: 'Nagapattinam, Tamil Nadu',
    linkedInUrl: 'https://www.linkedin.com/in/dhanushsakthivel',
    githubUrl: 'https://github.com/dhanushsakthi',
    portfolioUrl: 'https://kmdfoodproducts.com/about.php',
    photoUrl: '/uploads/dhanush_photo.jpg',
    resumePdfUrl: '/uploads/dhanush_resume.pdf',
    currentRole: 'Full-Stack Web & AI Developer',
    yearsExperience: '2+ Years'
  },
  siteSettings: {
    siteTitle: 'Dhanush S | Portfolio & Admin CMS',
    metaDescription: 'Professional Portfolio of Dhanush S - B.Tech AI & Data Science Student, Full-Stack Web & CMS Developer with real-world client experience.',
    keywords: ['Dhanush developer', 'Web Developer', 'AI & Data Science', 'Full-Stack Developer', 'CMS Developer', 'E-Commerce Developer'],
    theme: 'dark',
    maintenanceMode: false,
    adminPasswordHash: DEFAULT_PASSWORD_HASH
  },
  skills: [
    { id: 'sk-1', name: 'Java', category: 'Programming', level: 'Advanced', description: 'Core Java, OOPs concepts, collection frameworks, and backend application logic.', order: 1, published: true },
    { id: 'sk-2', name: 'Python', category: 'Programming', level: 'Advanced', description: 'Data structures, automation scripts, Pandas, Scikit-learn, and backend tools.', order: 2, published: true },
    { id: 'sk-3', name: 'C / C++', category: 'Programming', level: 'Intermediate', description: 'System fundamentals, algorithms, and structured programming concepts.', order: 3, published: true },
    { id: 'sk-4', name: 'SQL & Database Management', category: 'Database', level: 'Advanced', description: 'Relational schema design, SQL queries, indexing, joins, and performance optimization.', order: 4, published: true },
    { id: 'sk-5', name: 'HTML5 & CSS3', category: 'Web Development', level: 'Expert', description: 'Semantic HTML, responsive Flexbox/Grid layouts, and modern CSS styling.', order: 5, published: true },
    { id: 'sk-6', name: 'JavaScript (ES6+)', category: 'Web Development', level: 'Advanced', description: 'Asynchronous JS, DOM manipulation, RESTful API integration, and ES6+ features.', order: 6, published: true },
    { id: 'sk-7', name: 'React.js & Next.js', category: 'Web Development', level: 'Advanced', description: 'Component architecture, server components, state management, and modern React apps.', order: 7, published: true },
    { id: 'sk-8', name: 'Tailwind CSS', category: 'Web Development', level: 'Advanced', description: 'Utility-first UI styling, responsive design systems, and rapid prototyping.', order: 8, published: true },
    { id: 'sk-9', name: 'CMS & E-Commerce Development', category: 'Web Development', level: 'Expert', description: 'Custom CMS panels, product catalog workflow, shopping cart, and client admin systems.', order: 9, published: true },
    { id: 'sk-10', name: 'Artificial Intelligence', category: 'AI / Data', level: 'Advanced', description: 'AI algorithms, neural network fundamentals, and intelligent software integration.', order: 10, published: true },
    { id: 'sk-11', name: 'Machine Learning (Scikit-learn, Pandas)', category: 'AI / Data', level: 'Advanced', description: 'Supervised ML models, classification algorithms, feature engineering, and evaluation.', order: 11, published: true },
    { id: 'sk-12', name: 'Data Analytics & Reporting', category: 'AI / Data', level: 'Advanced', description: 'Data processing, statistical aggregation, exploratory analysis, and insights.', order: 12, published: true },
    { id: 'sk-13', name: 'Prompt Engineering & Hugging Face', category: 'AI / Data', level: 'Intermediate', description: 'LLM prompt tuning, AI model fine-tuning concepts, and API integration.', order: 13, published: true },
    { id: 'sk-14', name: 'Git & GitHub', category: 'Tools & Platforms', level: 'Expert', description: 'Version control workflows, branching, repository management, and collaboration.', order: 14, published: true },
    { id: 'sk-15', name: 'Power BI', category: 'Tools & Platforms', level: 'Intermediate', description: 'Interactive dashboard creation, business data visualization, and reporting.', order: 15, published: true },
    { id: 'sk-16', name: 'N8N & Automation', category: 'Tools & Platforms', level: 'Intermediate', description: 'Workflow automation, API webhooks integration, and business process automation.', order: 16, published: true },
    { id: 'sk-17', name: 'Docker & Firebase', category: 'Tools & Platforms', level: 'Intermediate', description: 'Containerization basics, Firebase authentication, real-time database, and hosting.', order: 17, published: true },
    { id: 'sk-18', name: 'Supabase & Vercel', category: 'Tools & Platforms', level: 'Advanced', description: 'Cloud Postgres backend management, authentication, and continuous deployment.', order: 18, published: true }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Junior Web Developer',
      company: 'Auro Tech Solutions',
      location: 'Tamil Nadu, India',
      startDate: '2024',
      endDate: 'Present',
      isCurrent: true,
      type: 'Full-time',
      highlights: [
        'Progressed from Frontend Developer Intern to Junior Web Developer, handling production customer websites.',
        'Maintained and enhanced customer websites and business applications through feature updates, content modifications, and bug fixes.',
        'Handled client requirements directly through technical calls and implemented requested software/website changes.',
        'Supported end-to-end development, deployment, and ongoing technical maintenance of client projects.'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'CMS Platforms'],
      order: 1,
      published: true
    },
    {
      id: 'exp-2',
      role: 'Freelance Full-Stack Web Developer',
      company: 'Self-Employed',
      location: 'Remote',
      startDate: '10/2024',
      endDate: 'Present',
      isCurrent: true,
      type: 'Freelance',
      highlights: [
        'Successfully delivered CMS platforms, e-commerce websites, and business applications for 12+ real-world clients.',
        'Managed entire project life cycles from requirement analysis, wireframing, and full-stack development to server deployment.',
        'Provided post-delivery modifications, performance optimization, and client maintenance support.'
      ],
      technologies: ['Full-Stack Web', 'CMS', 'E-Commerce', 'JavaScript', 'Database Management', 'API Integration'],
      order: 2,
      published: true
    },
    {
      id: 'exp-3',
      role: 'Machine Learning Intern',
      company: 'Livewire India',
      location: 'India',
      startDate: '02/2024',
      endDate: '03/2024',
      isCurrent: false,
      type: 'Internship',
      highlights: [
        'Collaborated with a team of developers to build a machine learning model for banking fraud prediction using historical financial datasets.',
        'Contributed actively to data cleaning, preprocessing, feature engineering, and model evaluation using Python, Pandas, and Scikit-learn.'
      ],
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Data Preprocessing'],
      order: 3,
      published: true
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'KMD Food Products',
      shortDescription: 'Production e-commerce platform for food product presentation, structured product categories, and shopping features.',
      detailedDescription: 'KMD Food Products is a full-featured e-commerce platform developed at Auro Tech Solutions. The system presents food product lines cleanly with structured product categories, search functionality, responsive customer browsing interfaces, product detail views, and cart workflows optimized for client business growth.',
      category: 'E-Commerce',
      technologies: ['E-Commerce', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'MySQL', 'Responsive Design'],
      role: 'Web Developer (Team at Auro Tech Solutions)',
      projectType: 'E-Commerce',
      clientContext: 'Auro Tech Solutions Client Project',
      imageUrl: '/certificates/FULL-STACK (LINKED-IN).jpg',
      screenshots: ['/certificates/FULL-STACK (LINKED-IN).jpg'],
      liveDemoUrl: 'https://kmdfoodproducts.com/about.php',
      isFeatured: true,
      published: true,
      order: 1
    },
    {
      id: 'proj-2',
      title: 'Aaraa Gifts',
      shortDescription: 'Dynamic CMS-based gifting platform displaying personalized products, corporate collections, and inquiry workflows.',
      detailedDescription: 'Aaraa Gifts is a custom CMS-based web solution developed as a freelance project. Designed to serve personalized and corporate gifting clients, it features dynamic product category displays, responsive UI navigation, customer inquiry integration, and CMS administration for easy product updates.',
      category: 'CMS',
      technologies: ['CMS Platform', 'JavaScript', 'HTML5', 'CSS3', 'Dynamic Content', 'PHP/SQL'],
      role: 'Freelance Full-Stack Developer',
      projectType: 'CMS',
      clientContext: 'Freelance Client Project',
      imageUrl: '/certificates/HTML(LINKED-IN).jpg',
      screenshots: ['/certificates/HTML(LINKED-IN).jpg'],
      liveDemoUrl: 'https://www.aaraagifts.com/',
      isFeatured: true,
      published: true,
      order: 2
    },
    {
      id: 'proj-3',
      title: 'Banking Fraud Prediction ML Model',
      shortDescription: 'Intelligent machine learning model designed to analyze financial transactions and predict potential banking fraud.',
      detailedDescription: 'A team-based machine learning solution developed during the Livewire India internship. Utilized historical financial dataset attributes, applied advanced data cleaning and feature engineering, and trained predictive models with Scikit-learn to classify fraudulent banking transactions efficiently.',
      category: 'AI / ML',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Data Science', 'Data Preprocessing'],
      role: 'Machine Learning Intern (Team Collaboration)',
      projectType: 'AI / ML',
      clientContext: 'Livewire India Internship',
      imageUrl: '/certificates/Novitech_Ai.jpg',
      screenshots: ['/certificates/Novitech_Ai.jpg'],
      githubUrl: 'https://github.com/dhanushsakthi',
      isFeatured: true,
      published: true,
      order: 3
    },
    {
      id: 'proj-4',
      title: 'Real-World Client Solutions Suite (12+ Clients)',
      shortDescription: 'Custom web solutions, business management applications, and tailored CMS tools built for diverse industry clients.',
      detailedDescription: 'A collection of over 12 full-stack websites and web systems built for clients during freelance development. Features responsive layouts, database management, automated user inquiries, and lightweight administration panels tailored to client requirements.',
      category: 'Client Work',
      technologies: ['Full-Stack', 'HTML/CSS/JS', 'SQL', 'CMS', 'API Integration', 'Responsive Design'],
      role: 'Freelance Lead Developer',
      projectType: 'Client Work',
      clientContext: 'Multiple Freelance Clients',
      imageUrl: '/certificates/DATA BASE DEVELOPMENT.jpg',
      screenshots: ['/certificates/DATA BASE DEVELOPMENT.jpg'],
      isFeatured: true,
      published: true,
      order: 4
    }
  ],
  awards: [],
  certifications: [
    {
      id: 'cert-1',
      title: 'Agentic AI Day Participation',
      issuer: 'Google Cloud',
      issueDate: '2025',
      imageUrl: '/certificates/agentic-ai.jpg',
      description: 'Hands-on participation certificate for Google Cloud Agentic AI architecture and intelligent agent development workshops.',
      order: 1,
      published: true
    },
    {
      id: 'cert-2',
      title: 'Python Certification (95.5%)',
      issuer: 'Certification Authority',
      issueDate: '2024',
      imageUrl: '/certificates/python.jpg',
      description: 'Advanced Python programming certification with high distinction score of 95.5%.',
      order: 2,
      published: true
    },
    {
      id: 'cert-3',
      title: 'Diploma in Computer Application (DCA) (92%)',
      issuer: 'Educational Institute',
      issueDate: '2024',
      imageUrl: '/certificates/Diploma_CA.jpg',
      description: 'Diploma in Computer Application with distinction score of 92%, covering computer fundamentals, office suites, and database management.',
      order: 3,
      published: true
    },
    {
      id: 'cert-4',
      title: 'Web Development Internship Certification',
      issuer: 'Livewire / Industry Provider',
      issueDate: 'May – June 2024',
      imageUrl: '/certificates/Live-Wire(internship).jpg',
      description: 'Practical Web Development internship certification focusing on full-stack web solutions and customer web portals.',
      order: 4,
      published: true
    },
    {
      id: 'cert-5',
      title: 'Artificial Intelligence Certification',
      issuer: 'Novitech R&D',
      issueDate: 'Mar – May 2024',
      imageUrl: '/certificates/Novitech_Ai.jpg',
      description: 'Comprehensive artificial intelligence certification covering neural networks, Python AI libraries, and model training.',
      order: 5,
      published: true
    },
    {
      id: 'cert-6',
      title: 'Database Development',
      issuer: 'Professional Certification',
      issueDate: '2024',
      imageUrl: '/certificates/DATA BASE DEVELOPMENT.jpg',
      description: 'Specialized certification in relational database management, schema design, and SQL querying.',
      order: 6,
      published: true
    },
    {
      id: 'cert-7',
      title: 'Full-Stack Web Development',
      issuer: 'LinkedIn Learning',
      issueDate: '2024',
      imageUrl: '/certificates/FULL-STACK (LINKED-IN).jpg',
      description: 'Comprehensive training covering full-stack frontend and backend web architecture.',
      order: 7,
      published: true
    },
    {
      id: 'cert-8',
      title: 'Generative AI Concepts',
      issuer: 'Industry Certification',
      issueDate: '2024',
      imageUrl: '/certificates/GENERATIVE AI.jpg',
      description: 'Certificate in Generative AI architectures, LLM prompt engineering, and AI tool integrations.',
      order: 8,
      published: true
    },
    {
      id: 'cert-9',
      title: 'HTML & CSS Web Fundamentals',
      issuer: 'LinkedIn Learning',
      issueDate: '2024',
      imageUrl: '/certificates/HTML(LINKED-IN).jpg',
      description: 'Verified certification in modern semantic HTML5 and responsive CSS layout techniques.',
      order: 9,
      published: true
    },
    {
      id: 'cert-10',
      title: 'Knowledge College AI & Tech Workshop',
      issuer: 'AVS / Knowledge College',
      issueDate: '2024',
      imageUrl: '/certificates/Knowledge_clg.jpg',
      description: 'Participation and excellence certificate in technical symposium and engineering workshop.',
      order: 10,
      published: true
    },
    {
      id: 'cert-11',
      title: 'Power BI Data Analytics',
      issuer: 'LinkedIn Learning',
      issueDate: '2024',
      imageUrl: '/certificates/POWER-BI.jpg',
      description: 'Certification in business intelligence, interactive dashboard creation, and data visualization using Microsoft Power BI.',
      order: 11,
      published: true
    },
    {
      id: 'cert-12',
      title: 'SQL Data Reporting and Analysis',
      issuer: 'LinkedIn Learning',
      issueDate: '2024',
      imageUrl: '/certificates/SQL-DATA REPORTING AND ANALYSIS (LINKED-IN).jpg',
      description: 'Advanced SQL queries, data reporting, aggregation, and performance optimization.',
      order: 12,
      published: true
    },
    {
      id: 'cert-13',
      title: 'Binary Amman Tech Excellence',
      issuer: 'Binary Amman',
      issueDate: '2024',
      imageUrl: '/certificates/binary_amman.jpg',
      description: 'Certificate of technical achievement in coding competition and software development.',
      order: 13,
      published: true
    },
    {
      id: 'cert-14',
      title: 'Python Mastery Certificate',
      issuer: 'Chitti Tech',
      issueDate: '2024',
      imageUrl: '/certificates/chitti-python.jpg',
      description: 'Practical Python programming and application building certification.',
      order: 14,
      published: true
    },
    {
      id: 'cert-15',
      title: 'Specialized Technical Certification',
      issuer: 'Industry Certification',
      issueDate: '2024',
      imageUrl: '/certificates/62ecf93f-505e-4260-b16f-61d789923084.png',
      description: 'Verified technical achievement certificate in software systems development.',
      order: 15,
      published: true
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech Artificial Intelligence and Data Science',
      institution: 'AVS Engineering College',
      location: 'Salem, Tamil Nadu',
      score: 'CGPA: 8.5',
      startDate: '2023',
      endDate: 'Present',
      details: 'Focusing on Machine Learning, Deep Learning, Data Analytics, Python, Java, SQL, and Web Application Engineering.'
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (HSC) – 12th',
      institution: 'Adharsh Matric Hr. Sec School',
      location: 'Nagapattinam, Tamil Nadu',
      score: 'Percentage: 66.17%',
      startDate: '2022',
      endDate: '2023',
      details: 'Higher secondary education with focus on Computer Science, Mathematics, and Physics.'
    }
  ]
};
