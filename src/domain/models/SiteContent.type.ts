import type {
	AppShowcaseContent,
	ArchitectureContent,
	AssetsContent,
	ComparisonContent,
	ComplianceContent,
	DifferentiatorsContent,
	FaqContent,
	FooterContent,
	HeroContent,
	HowItWorksContent,
	NewsletterContent,
	OpenSourceContent,
	ProductsContent,
	SecurityContent,
	StatsContent,
	TechStackContent,
} from './sections';

export type SiteContent = {
  hero: HeroContent;
  stats: StatsContent;
  architecture: ArchitectureContent;
  security: SecurityContent;
  howItWorks: HowItWorksContent;
  differentiators: DifferentiatorsContent;
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
