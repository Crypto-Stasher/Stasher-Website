export type AppWalkthroughStep = {
  /** Step number shown on the card, e.g. "01". */
  id: string;
  title: string;
  description: string;
  /** Path under public/, portrait 820x1457. */
  src: string;
  alt: string;
};
