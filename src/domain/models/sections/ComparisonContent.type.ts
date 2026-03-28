export type ComparisonRow = {
  feature: string;
  stasher: string;
  competitor1: string;
  competitor2: string;
};

export type ComparisonContent = {
  title: string;
  subtitle: string;
  competitors: [string, string];
  rows: ComparisonRow[];
};
