import {
  BarChart3,
  BrainCircuit,
  MailCheck,
  Megaphone,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';

export const navItems = [
  { label: 'Services', href: '#services' },
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
