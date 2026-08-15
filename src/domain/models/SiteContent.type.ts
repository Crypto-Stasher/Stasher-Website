import type {
	DifferentiatorsContent,
	FaqContent,
	FooterContent,
	HeroContent,
	NewsletterContent,
} from './sections';

export type SiteContent = {
  hero: HeroContent;
  differentiators: DifferentiatorsContent;
  faq: FaqContent;
  newsletter: NewsletterContent;
  footer: FooterContent;
};
