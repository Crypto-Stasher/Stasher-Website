export type HeroContent = {
  tag: string;
  title: string;
  description: string;
  cta: string;
  networkLoad: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type StatsContent = {
  items: StatItem[];
};

export type DifferentiatorItem = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export type ComplianceContent = {
  title: string;
  description: string;
  points: string[];
};

export type AssetsContent = {
  title: string;
  items: string[];
};

export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export type FooterContent = {
  transmission: string;
  copyright: string;
  socials: SocialLink[];
};

export type ArchitectureZone = {
  zone: string;
  color: string;
  machines: { name: string; role: string; detail: string }[];
};

export type ArchitectureContent = {
  title: string;
  subtitle: string;
  description: string;
  zones: ArchitectureZone[];
};

export type SecurityFeature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type SecurityContent = {
  title: string;
  subtitle: string;
  description: string;
  features: SecurityFeature[];
};

export type SigningStep = {
  step: number;
  label: string;
  description: string;
  zone: 'hot' | 'dmz' | 'cold';
};

export type HowItWorksContent = {
  title: string;
  subtitle: string;
  steps: SigningStep[];
};

export type ProductTier = {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
};

export type ProductsContent = {
  title: string;
  subtitle: string;
  tiers: ProductTier[];
};

export type TechItem = {
  name: string;
  detail: string;
  category: string;
};

export type TechStackContent = {
  title: string;
  subtitle: string;
  items: TechItem[];
};

export type AppFeature = {
  title: string;
  description: string;
};

export type AppShowcaseContent = {
  title: string;
  subtitle: string;
  description: string;
  features: AppFeature[];
  downloadLinks: { platform: string; url: string }[];
};

export type ComparisonRow = {
  feature: string;
  stasher: string;
  competitor1: string;
  competitor2: string;
};

export type ComparisonContent = {
  title: string;
  subtitle: string;
  competitors: [string, string];
  rows: ComparisonRow[];
};

export type OpenSourceContent = {
  title: string;
  subtitle: string;
  description: string;
  points: { title: string; description: string }[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  title: string;
  subtitle: string;
  items: FaqItem[];
};

export type NewsletterContent = {
  title: string;
  description: string;
  placeholder: string;
  cta: string;
};

export type SiteContent = {
  hero: HeroContent;
  stats: StatsContent;
  architecture: ArchitectureContent;
  security: SecurityContent;
  howItWorks: HowItWorksContent;
  differentiators: {
    title: string;
    items: DifferentiatorItem[];
  };
  products: ProductsContent;
  appShowcase: AppShowcaseContent;
  comparison: ComparisonContent;
  techStack: TechStackContent;
  openSource: OpenSourceContent;
  compliance: ComplianceContent;
  faq: FaqContent;
  assets: AssetsContent;
  newsletter: NewsletterContent;
  footer: FooterContent;
};
