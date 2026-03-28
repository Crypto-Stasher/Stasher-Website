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
