import type {
	AppShowcaseContent,
	ArchitectureContent,
	DifferentiatorsContent,
	FaqContent,
	FooterContent,
	HeroContent,
	NewsletterContent,
	OpenSourceContent,
} from './sections';

export type SiteContent = {
  hero: HeroContent;
  architecture: ArchitectureContent;
  differentiators: DifferentiatorsContent;
  appShowcase: AppShowcaseContent;
  openSource: OpenSourceContent;
  faq: FaqContent;
  newsletter: NewsletterContent;
  footer: FooterContent;
};
