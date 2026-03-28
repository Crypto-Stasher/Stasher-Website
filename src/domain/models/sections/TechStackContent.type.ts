export type TechItem = {
  name: string;
  detail: string;
  category: string;
};

export type TechStackContent = {
  title: string;
  subtitle: string;
  items: TechItem[];
};
