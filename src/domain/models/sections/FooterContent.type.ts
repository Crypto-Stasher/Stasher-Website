export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export type FooterContent = {
  transmission: string;
  copyright: string;
  socials: SocialLink[];
};
