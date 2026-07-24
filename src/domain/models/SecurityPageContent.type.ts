import type { SecuritySection } from './SecuritySection.type';

export type SecurityPageContent = {
  kicker: string;
  title: string;
  intro: string;
  sections: SecuritySection[];
};
