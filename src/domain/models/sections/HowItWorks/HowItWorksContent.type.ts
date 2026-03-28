export type Zone = 'hot' | 'dmz' | 'cold';

export type SigningStep = {
  step: number;
  label: string;
  description: string;
  zone: Zone;
};

export type HowItWorksContent = {
  title: string;
  subtitle: string;
  steps: SigningStep[];
};
