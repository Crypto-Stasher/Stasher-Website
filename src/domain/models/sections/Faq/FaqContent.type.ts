export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  title: string;
  subtitle: string;
  items: FaqItem[];
};
