export const experience = [
  {
    company: 'Merlin AI by Foyer',
    position: 'Product Engineer',
    location: 'Bengaluru, Karnataka, India',
    startDate: '2025-02-01',
    endDate: null,
    url: 'https://getmerlin.in',
    summary:
      'Driving product engineering initiatives for Merlin AI, focused on seamless AI integration and next-gen chat experiences.',
    highlights: [
      'Shipped ChatGPT Imports UI, enabling 10,000+ users to migrate chat history smoothly.',
      'Launched project-based chat history pages, improving user navigation and increasing session retention by 15%.',
      'Revamped the Model Selector, boosting model adoption by 80% and improving user satisfaction scores by 30%.',
      'Led development of a prompt enhancement feature, improving real-time UX for 2M+ users by bridging backend streaming with a responsive frontend.',
    ],
    current: true,
  },
  {
    company: 'SARAL - The Influencer OS',
    position: 'Software Engineer',
    location: 'Bengaluru, Karnataka, India',
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    url: 'https://getsaral.com',
    summary:
      'Built core features and internal tools improving efficiency and decision-making for influencer campaigns.',
    highlights: [
      'Delivered revamped dashboard—reduced onboarding and insight delivery time by 30%.',
      'Engineered a multi-select drag-and-drop feature for campaign management, increasing ops efficiency by 40% for large-scale campaigns.',
      'Built a content submission system to streamline influencer-brand collaboration, reducing content approval times by 60%.',
      'Enhanced real-time campaign metric tracking, empowering managers with data to improve campaign ROI by up to 20%.',
    ],
  },
  {
    company: 'Proof-of-Skill Protocol',
    position: 'Founding Product Engineer',
    location: 'Bengaluru, Karnataka, India',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    url: 'https://proofofskill.org',
    summary:
      'Architected and launched a decentralized skill validation protocol, revolutionizing unbiased, transparent candidate evaluation for tech hiring.',
    highlights: [
      'Led MVP development for validators, candidates, and recruiters.',
      'Designed and implemented a voting-based consensus algorithm to ensure fair and transparent skill validation across a network of 150+ validators.',
      'Built proctored assessment workflow with real-time streaming, cutting time-to-interview by 50%.',
      'Launched recruiter dashboard with skill heatmaps, driving smarter hiring for 20+ partners.',
      'Scaled cloud infra (EC2, NGINX, PM2, Next.js) to support 5000+ actions on the platform.',
    ],
  },
  {
    company: 'Freelance',
    position: 'Independent Contractor',
    location: 'Bengaluru, Karnataka, India',
    startDate: '2024-02-01',
    endDate: '2024-05-31',
    url: 'https://milindmishra.com',
    summary:
      'Delivered AI-powered products for hiring and skills validation as an independent engineer.',
    highlights: [
      'Built recruiter analytics platform with advanced candidate search.',
      'Engineered an AI-powered quiz system with Vercel AI SDK and OpenAI.',
      'Deployed scalable Next.js UIs with AI workflow integration.',
    ],
  },
  {
    company: 'StartupHire',
    position: 'Software Engineer',
    location: 'Remote',
    startDate: '2023-08-01',
    endDate: '2024-01-31',
    url: 'https://www.linkedin.com/company/startuphire',
    summary:
      'Prototyped and launched candidate pipeline tools to accelerate startup hiring workflows.',
    highlights: [
      'Led team to prototype recruiting pipeline, reducing manual work for hiring managers by 40%.',
      'Integrated multiple job boards into a unified platform, saving recruiters an average of 5 hours per week.',
    ],
  },
  {
    company: 'National Yang Ming Chiao Tung University',
    position: 'Research Assistant',
    location: 'Hsinchu, Taiwan',
    startDate: '2023-02-01',
    endDate: '2023-07-31',
    url: 'https://www.nycu.edu.tw/',
    summary:
      'Built and optimized indoor positioning system interfaces for a cutting-edge IoT research project.',
    highlights: [
      'Developed a frontend for an MQTT-powered indoor positioning platform to visualize real-time data from IoT devices.',
      'Enhanced UWB positioning accuracy from 20cm to under 10cm—significantly improving research outcomes.',
      'Enabled 3D real-time visualization of tracking data for production ready factories and research labs.',
    ],
  },
  {
    company: 'Locus Connect',
    position: 'Software Engineer',
    location: 'Hsinchu, Taiwan',
    startDate: '2022-07-01',
    endDate: '2023-01-31',
    url: 'https://www.locusconnect.com/',
    summary:
      'Developed core 3D visualization and internal infra tools for proprietary IoT positioning solutions.',
    highlights: [
      'Produced frontend for 3D positioning platform, supporting live deployments.',
      'Created and maintained the marketing site for B2B outreach.',
      'Dockerized and maintained internal services, achieving 99.9% uptime and cutting deployment times by 80%.',
    ],
  },
  {
    company: 'iNeuron.ai',
    position: 'UX Designer',
    location: 'Bengaluru, Karnataka, India',
    startDate: '2022-05-01',
    endDate: '2022-06-30',
    url: 'https://www.ineuron.ai/',
    summary:
      'Designed intuitive user experiences and managed design systems for ed-tech platforms.',
    highlights: [
      'Created user flows for hiring and onboarding.',
      'Managed a scalable design system, increasing developer velocity by 30%.',
      'Crafted marketing collateral for two campaign launches, contributing to a 20% increase in lead generation.',
    ],
  },
  {
    company: 'Plusklass',
    position: 'Technical Writer',
    location: 'Remote',
    startDate: '2022-01-01',
    endDate: '2022-04-30',
    url: 'https://www.plusklass.com/',
    summary:
      'Authored and curated technical content for HTML/CSS/JS modules, driving learning impact for novices.',
    highlights: [
      'Created beginner-friendly learning content adopted by 2,000+ new users.',
      'Structured and reviewed curriculum, improving student course completion rates by 40%.',
    ],
  },
];

// Helper function to format dates
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

// Helper function to calculate duration
export const calculateDuration = (
  startDate: string,
  endDate: string | null
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 1) {
    return '< 1 month';
  }
  if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
  }
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  if (months === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${
    months === 1 ? 'month' : 'months'
  }`;
};
