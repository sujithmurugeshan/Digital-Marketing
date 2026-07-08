import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Factory,
  GraduationCap,
  HardHat,
  HeartPulse,
  House,
  Landmark,
  MailCheck,
  Megaphone,
  MousePointerClick,
  Plane,
  Rocket,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Sparkles,
  Target,
  UserRound,
  Utensils,
} from 'lucide-react';

export const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Process', href: '#process' },
  { label: 'Results', href: '#results' },
  { label: 'Contact', href: '#contact' },
];

export const metrics = [
  { value: '4.8x', label: 'Average return on ad spend' },
  { value: '62%', label: 'Lower cost per qualified lead' },
  { value: '120+', label: 'Campaign launches managed' },
];

export const services = [
  {
    title: 'Performance Ads',
    description:
      'Full-funnel paid search and social campaigns built around revenue, not vanity metrics.',
    icon: MousePointerClick,
  },
  {
    title: 'SEO Growth',
    description:
      'Technical audits, content clusters, and search intent mapping that compound traffic over time.',
    icon: Search,
  },
  {
    title: 'Brand Strategy',
    description:
      'Positioning, messaging, and campaign concepts that make your offer easier to understand and remember.',
    icon: Sparkles,
  },
  {
    title: 'Email Automation',
    description:
      'Lifecycle journeys, lead nurturing, and retention flows that keep prospects moving.',
    icon: MailCheck,
  },
  {
    title: 'Analytics Setup',
    description:
      'Dashboards, conversion tracking, and reporting that tell you what is actually working.',
    icon: BarChart3,
  },
  {
    title: 'Conversion Design',
    description:
      'Landing pages and experiments focused on clearer offers, faster decisions, and more booked calls.',
    icon: Target,
  },
];

export const industryFilters = [
  { label: 'All industries', value: 'all' },
  { label: 'B2B', value: 'b2b' },
  { label: 'D2C', value: 'd2c' },
  { label: 'Local', value: 'local' },
  { label: 'Digital-first', value: 'digital' },
];

export const industries = [
  {
    title: 'Healthcare',
    tag: 'Trust-first messaging',
    categories: ['local'],
    icon: HeartPulse,
  },
  {
    title: 'Education',
    tag: 'Enrollment funnels',
    categories: ['local', 'd2c'],
    icon: GraduationCap,
  },
  {
    title: 'Real Estate',
    tag: 'Listings that convert leads, not just views',
    categories: ['local', 'b2b'],
    icon: House,
    wide: true,
  },
  {
    title: 'Fashion & Apparel',
    tag: 'Drop-driven hype',
    categories: ['d2c', 'digital'],
    icon: Shirt,
  },
  {
    title: 'Beauty & Cosmetics',
    tag: 'UGC and influencer play',
    categories: ['d2c', 'digital'],
    icon: Sparkles,
  },
  {
    title: 'Restaurants & Cafes',
    tag: 'Local discovery',
    categories: ['local'],
    icon: Utensils,
  },
  {
    title: 'Construction',
    tag: "B2B lead pipelines that don't rely on referrals alone",
    categories: ['b2b'],
    icon: HardHat,
    wide: true,
  },
  {
    title: 'Manufacturing',
    tag: 'Trade and export reach',
    categories: ['b2b'],
    icon: Factory,
  },
  {
    title: 'Finance',
    tag: 'Compliant, still bold',
    categories: ['b2b', 'local'],
    icon: Landmark,
  },
  {
    title: 'Travel & Tourism',
    tag: 'Seasonal booking spikes',
    categories: ['d2c', 'digital'],
    icon: Plane,
  },
  {
    title: 'E-commerce',
    tag: 'Cart-recovery and performance ads that pay for themselves',
    categories: ['d2c', 'digital'],
    icon: ShoppingCart,
  },
  {
    title: 'Fitness & Wellness',
    tag: 'Gyms, trainers, and fitness studios',
    categories: ['digital'],
    icon: UserRound,
  },
  {
    title: 'Technology & SaaS',
    tag: 'Software, SaaS platforms, and tech services',
    categories: ['b2b', 'digital'],
    icon: Rocket,
  },
  {
    title: 'Legal Services',
    tag: 'Law firms and corporate legal consultancies',
    categories: ['local', 'b2b'],
    icon: BriefcaseBusiness,
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Audit the funnel',
    description:
      'We inspect channels, landing pages, offers, tracking, and sales handoff to find the highest-leverage opportunities.',
  },
  {
    step: '02',
    title: 'Build the growth plan',
    description:
      'You get a focused 90-day roadmap with budget allocation, channel priorities, experiments, and KPI targets.',
  },
  {
    step: '03',
    title: 'Launch and optimize',
    description:
      'Campaigns go live with weekly testing, clear reporting, and fast creative iteration based on real data.',
  },
];

export const caseStudies = [
  {
    company: 'SaaSScale',
    category: 'B2B SaaS',
    result: '211% pipeline growth',
    description:
      'Rebuilt search campaigns and landing pages around buying-stage keywords and demo-ready traffic.',
  },
  {
    company: 'UrbanNest',
    category: 'Home services',
    result: '38% lower CPL',
    description:
      'Segmented paid social audiences, refreshed ad creative, and added lead scoring for sales teams.',
  },
  {
    company: 'BrightCart',
    category: 'Ecommerce',
    result: '5.4x blended ROAS',
    description:
      'Combined shopping ads, lifecycle email, and retention offers into one measurable growth system.',
  },
];

export const testimonials = [
  {
    quote:
      'LaunchWave gave us the first marketing dashboard our leadership team actually trusted.',
    name: 'Maya Shah',
    role: 'COO, SaaSScale',
  },
  {
    quote:
      'They moved quickly, explained the tradeoffs clearly, and improved lead quality within the first month.',
    name: 'Jordan Lee',
    role: 'Founder, UrbanNest',
  },
];

export const trustItems = [
  { label: 'Privacy-first tracking', icon: ShieldCheck },
  { label: 'Creative testing engine', icon: Megaphone },
  { label: 'AI-assisted insights', icon: BrainCircuit },
];
