import type { ReactNode } from 'react';

export type SocialLink = {
  name: string;
  url: string;
  icon: ReactNode;
};

export type FooterContent = {
  transmission: string;
  copyright: string;
  socials: SocialLink[];
};
