import type {
	AppShowcaseContent,
	ArchitectureContent,
	AssetsContent,
	ComparisonContent,
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
	TrustSignalsContent,
} from './sections';

export type SiteContent = {
  hero: HeroContent;
  trustSignals: TrustSignalsContent;
  stats: StatsContent;
  architecture: ArchitectureContent;
  security: SecurityContent;
  howItWorks: HowItWorksContent;
  differentiators: DifferentiatorsContent;
  products: ProductsContent;
  appShowcase: AppShowcaseContent;
  comparison: ComparisonContent;
  openSource: OpenSourceContent;
  faq: FaqContent;
  assets: AssetsContent;
  newsletter: NewsletterContent;
  footer: FooterContent;
};
