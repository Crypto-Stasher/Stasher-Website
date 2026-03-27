export interface HeroContent {
  tag: string;
  title: string;
  description: string;
  cta: string;
  networkLoad: string;
}

export interface DifferentiatorItem {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface ComplianceContent {
  title: string;
  description: string;
  points: string[];
}

export interface AssetsContent {
  title: string;
  items: string[];
}

export interface FooterContent {
  transmission: string;
  copyright: string;
}

export interface SiteContent {
  hero: HeroContent;
  differentiators: {
    title: string;
    items: DifferentiatorItem[];
  };
  compliance: ComplianceContent;
  assets: AssetsContent;
  footer: FooterContent;
}
