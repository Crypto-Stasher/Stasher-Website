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

export type SiteContent = {
  hero: HeroContent;
  differentiators: {
    title: string;
    items: DifferentiatorItem[];
  };
  compliance: ComplianceContent;
  assets: AssetsContent;
  footer: FooterContent;
};
