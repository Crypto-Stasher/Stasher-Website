export type SecuritySectionItem = {
  title: string;
  description: string;
};

export type SecuritySection = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  items?: SecuritySectionItem[];
};
