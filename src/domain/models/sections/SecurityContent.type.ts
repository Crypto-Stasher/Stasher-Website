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
