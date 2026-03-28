export type AppFeature = {
  title: string;
  description: string;
};

export type DownloadLink = {
  platform: string;
  url: string;
};

export type AppShowcaseContent = {
  title: string;
  subtitle: string;
  description: string;
  features: AppFeature[];
  downloadLinks: DownloadLink[];
};
