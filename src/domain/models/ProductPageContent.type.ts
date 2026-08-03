import type { AssetsContent } from './sections';
import type { ProductFeature } from './ProductFeature.type';
import type { ProductSpecGroup } from './ProductSpecGroup.type';

export type ProductPageContent = {
  kicker: string;
  name: string;
  tagline: string;
  intro: string;
  availability: string;
  features: ProductFeature[];
  inTheBox: string[];
  specGroups: ProductSpecGroup[];
  assets: AssetsContent;
};
