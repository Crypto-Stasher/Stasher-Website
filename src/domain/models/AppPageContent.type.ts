import type { AppDownload } from './AppDownload.type';
import type { AppWalkthroughStep } from './AppWalkthroughStep.type';
import type { ProductFeature } from './ProductFeature.type';

export type AppPageContent = {
  kicker: string;
  title: string;
  intro: string;
  downloadsTitle: string;
  downloadsNote: string;
  downloads: AppDownload[];
  walkthroughTitle: string;
  walkthroughHeading: string;
  /** Ordered: each step follows on from the one before it. */
  walkthrough: AppWalkthroughStep[];
  features: ProductFeature[];
  requirements: string[];
};
