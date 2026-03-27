export type HeroContent = {
  tag: string;
  title: string;
  description: string;
  cta: string;
  networkLoad: string;
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

export type FooterContent = {
  transmission: string;
  copyright: string;
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

export type SiteContent = {
  hero: HeroContent;
  architecture: ArchitectureContent;
  security: SecurityContent;
  howItWorks: HowItWorksContent;
  differentiators: {
    title: string;
    items: DifferentiatorItem[];
  };
  products: ProductsContent;
  techStack: TechStackContent;
  compliance: ComplianceContent;
  assets: AssetsContent;
  footer: FooterContent;
};
