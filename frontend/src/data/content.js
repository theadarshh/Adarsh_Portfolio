// ============================================================
// Adarsh R — Portfolio v3 Content
// Single source of truth — edit here, reflects everywhere
// ============================================================

export const PROFILE = {
  name:     'Adarsh R',
  role:     'Full Stack Developer',
  tagline:  'Engineering scalable systems with Java, Spring Boot, and React.',
  bio: [
    "I'm Adarsh R, a Full Stack Developer from Bangalore with a B.E. in Information Science & Engineering (Sri Siddhartha Institute of Technology, 2024). I build end-to-end web applications with a strong focus on clean backend architecture, REST API design, and maintainable code.",
    "Currently working on my first freelance project — a full-stack online learning platform — while deepening expertise in backend systems, cloud infrastructure, and DSA through certifications, open-source exploration, and consistent practice on LeetCode.",
  ],
  email:    'adarshr3131@gmail.com',
  location: 'Bangalore, India',
  status:   'Open to Full-Time Roles',
  links: {
    github:    'https://github.com/theadarshh',
    linkedin:  'https://www.linkedin.com/in/adarsh-r31/',
    leetcode:  'https://leetcode.com/u/theadarshh/',
    youtube:   'https://youtube.com/@peakprospective',
    portfolio: 'https://adarshprofile.netlify.app/',
  },
}

export const SKILLS = [
  // Programming Languages
  { name: 'Java',         category: 'Programming', devicon: 'java',           color: '#f89820' },
  { name: 'Python',       category: 'Programming', devicon: 'python',         color: '#3776ab' },
  { name: 'JavaScript',   category: 'Programming', devicon: 'javascript',     color: '#f7df1e' },
  { name: 'SQL',          category: 'Programming', devicon: 'azuresqldatabase',color: '#0078d4' },
  // Backend
  { name: 'Spring Boot',  category: 'Backend',     devicon: 'spring',         color: '#6db33f' },
  { name: 'Spring MVC',   category: 'Backend',     devicon: 'spring',         color: '#6db33f' },
  { name: 'Hibernate/JPA',category: 'Backend',     devicon: 'hibernate',      color: '#59666c' },
  { name: 'REST API',     category: 'Backend',     devicon: 'fastapi',        color: '#009688' },
  { name: 'JWT Auth',     category: 'Backend',     devicon: 'java',           color: '#f89820' },
  { name: 'Maven',        category: 'Backend',     devicon: 'maven',          color: '#c71a36' },
  // Frontend
  { name: 'React',        category: 'Frontend',    devicon: 'react',          color: '#61dafb' },
  { name: 'HTML5',        category: 'Frontend',    devicon: 'html5',          color: '#e34f26' },
  { name: 'CSS3',         category: 'Frontend',    devicon: 'css3',           color: '#1572b6' },
  { name: 'Tailwind CSS', category: 'Frontend',    devicon: 'tailwindcss',    color: '#38bdf8' },
  // Database
  { name: 'MySQL',        category: 'Database',    devicon: 'mysql',          color: '#4479a1' },
  { name: 'PostgreSQL',   category: 'Database',    devicon: 'postgresql',     color: '#336791' },
  { name: 'MongoDB',      category: 'Database',    devicon: 'mongodb',        color: '#47a248' },
  // Cloud / DevOps
  { name: 'Oracle Cloud', category: 'Cloud / DevOps', devicon: 'oracle',     color: '#f80000' },
  { name: 'Git',          category: 'Cloud / DevOps', devicon: 'git',         color: '#f05032' },
  { name: 'GitHub',       category: 'Cloud / DevOps', devicon: 'github',      color: '#dde5f2' },
  { name: 'Docker',       category: 'Cloud / DevOps', devicon: 'docker',      color: '#2496ed' },
  { name: 'Postman',      category: 'Cloud / DevOps', devicon: 'postman',     color: '#ff6c37' },
  { name: 'IntelliJ',     category: 'Cloud / DevOps', devicon: 'intellij',    color: '#fe315d' },
  // Core Concepts
  { name: 'DSA',          category: 'Core Concepts', devicon: null,           color: '#60a5fa', emoji: '⚙' },
  { name: 'OOP',          category: 'Core Concepts', devicon: null,           color: '#60a5fa', emoji: '🔷' },
  { name: 'Microservices',category: 'Core Concepts', devicon: null,           color: '#22d3ee', emoji: '🔗' },
  { name: 'SOLID Principles', category: 'Core Concepts', devicon: null,       color: '#a78bfa', emoji: '📐' },
  { name: 'System Design',category: 'Core Concepts', devicon: null,           color: '#34d399', emoji: '🏗' },
]

export const PROJECTS = [
  {
    id: 'learning-platform',
    featured: true,
    name: 'Full-Stack Online Learning Platform',
    badge: 'Freelance · Ongoing',
    badgeColor: '#22d3ee',
    description: 'Building a complete e-learning platform as my first freelance engagement. Responsible for full backend architecture, REST API design, and frontend integration.',
    highlights: [
      'Spring Boot REST APIs with layered architecture',
      'JWT-based authentication and role management',
      'OTP verification via SMTP email',
      'MySQL schema design and optimization',
      'Payment module integration',
    ],
    tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'JWT', 'SMTP'],
    url: null,
    github: null,
  },
  {
    id: 'eatsy',
    featured: false,
    name: 'Eatsy – Food Ordering Platform',
    badge: 'Course Project · Tap Academy',
    badgeColor: '#f59e0b',
    description: 'Full-stack food ordering and delivery platform with a clean REST API backend, optimized SQL queries, and a layered Spring Boot architecture.',
    highlights: [
      'REST API design with Spring Boot',
      'Optimized SQL queries and schema',
      'Layered controller-service-repository architecture',
    ],
    tech: ['Spring Boot', 'MySQL', 'REST API', 'Java'],
    url: null,
    github: 'https://github.com/theadarshh',
  },
  {
    id: 'prison',
    featured: false,
    name: 'Prison Management System',
    badge: 'Academic Project',
    badgeColor: '#a78bfa',
    description: 'Comprehensive management system for correctional facilities covering inmate records, visitor tracking, staff management, and automated reporting.',
    highlights: [
      'Inmate, visitor, and staff management modules',
      'Relational database design',
      'Automated reporting system',
    ],
    tech: ['Java', 'MySQL', 'Spring Boot'],
    url: null,
    github: 'https://github.com/theadarshh',
  },
  {
    id: 'dal-detection',
    featured: false,
    name: 'Dal Grain Adulteration Detection',
    badge: 'Academic Research',
    badgeColor: '#34d399',
    description: 'Deep learning model using YOLO object detection to identify adulteration in dal grain samples with ~92% accuracy.',
    highlights: [
      'YOLO-based object detection pipeline',
      '~92% detection accuracy',
      'Dataset preprocessing and model evaluation',
    ],
    tech: ['Python', 'YOLO', 'Deep Learning', 'Computer Vision'],
    url: null,
    github: 'https://github.com/theadarshh/Dal-Adulteration-Detection',
  },
  {
    id: 'portfolio-v1',
    featured: false,
    name: 'Personal Portfolio Website (v1)',
    badge: 'Live · Netlify',
    badgeColor: '#22d3ee',
    description: 'Earlier version of my personal portfolio — built from scratch to showcase projects, skills, and contact info. Deployed and live on Netlify.',
    highlights: [
      'Built with HTML, CSS & JavaScript',
      'Responsive layout across all devices',
      'Deployed live on Netlify',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    url: 'https://adarshprofile.netlify.app/',
    github: 'https://github.com/theadarshh/Portfolio_Website',
  },
]

export const LEETCODE_STATS = {
  totalSolved:  250,
  easySolved:   100,
  mediumSolved: 120,
  hardSolved:   25,
  activeDays:   200,
  longestStreak: 70,
  // Totals for ring % calc
  easyTotal:    850,
  mediumTotal:  1680,
  hardTotal:    750,
}

export const EDUCATION = [
  {
    level: 'University',
    degree: 'Bachelor of Engineering',
    field: 'Information Science & Engineering',
    institution: 'Sri Siddhartha Institute of Technology',
    location: 'Tumkur, Karnataka',
    period: '2019 – 2024',
  },
  {
    level: 'Pre-University',
    degree: 'Pre-University (Science – PCMB)',
    field: '',
    institution: 'Genius PU College',
    location: 'Mysuru, Karnataka',
    period: '2017 – 2019',
  },
  {
    level: 'School',
    degree: 'SSLC',
    field: '',
    institution: 'Shree Vasavi Vidya Kendra',
    location: 'Kollegal, Karnataka',
    period: '2016 – 2017',
  },
]

export const CERTIFICATIONS = [
  {
    name: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    color: '#f80000',
    icon: 'devicon-oracle-plain',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=122106FBEB850C9EB9DD96A593B266F6546F87743FA2AEA698A633497E6703D3',
  },
  {
    name: 'Oracle Cloud Infrastructure Generative AI Certified Professional',
    issuer: 'Oracle',
    year: '2025',
    color: '#f80000',
    icon: 'devicon-oracle-plain',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=C9B95B104BE37E0D6D1C5BD2746EFE72D702BE26BAFFB7F8211E76CA7F3D75D8',
  },
  {
    name: 'Oracle Cloud Infrastructure Data Science Associate',
    issuer: 'Oracle',
    year: '2025',
    color: '#f80000',
    icon: 'devicon-oracle-plain',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=BC767B2908547D341138A483B5C1D3AB3F1A1C0B94FAF190D7698A44FE30BFFE',
  },
  {
    name: 'HackerRank Software Engineer Certificate',
    issuer: 'HackerRank',
    year: '2024',
    color: '#2ec866',
    icon: null,
    emoji: '🏆',
    url: 'https://www.hackerrank.com/certificates/iframe/c66278bd7049',
  },
  {
    name: 'Full Stack Web Development',
    issuer: 'Tap Academy',
    year: '2024',
    color: '#60a5fa',
    icon: null,
    emoji: '🎓',
    url: 'https://drive.google.com/file/d/1p7if_LGpHa3Z6WXaRQB3YbH48j-Q-fD0/view',
  },
  {
    name: 'Data Structures & Backend Development with Java',
    issuer: 'Coursera',
    year: '2023',
    color: '#0056d2',
    icon: 'devicon-java-plain',
    url: 'https://www.coursera.org/account/accomplishments/verify/TV98CEF1QN9H',
  },
]

export const ACTIVITIES = [
  { icon: '📚', label: 'Completing industry certifications (Oracle Cloud, HackerRank)' },
  { icon: '🔨', label: 'Building real-world freelance and personal projects' },
  { icon: '🌐', label: 'Exploring open-source codebases on GitHub to learn real project structures' },
  { icon: '🧩', label: 'Practicing Data Structures & Algorithms — 250+ problems on LeetCode' },
  { icon: '☁️', label: 'Learning cloud infrastructure: Oracle Cloud certified (AI, GenAI, Data Science)' },
]

export const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Work',     href: '#projects' },
  { label: 'Stats',    href: '#leetcode' },
  { label: 'Education',href: '#education'},
  { label: 'Resume',   href: '#resume'   },
  { label: 'Contact',  href: '#contact'  },
]
