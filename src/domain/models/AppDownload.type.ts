import type { Platform } from '../../presentation/shared/components/PlatformIcon';

export type AppDownload = {
  /** Selects the logo as well as the label, so the two cannot drift apart. */
  platform: Platform;
  /** Label shown on the button. */
  label: string;
  /** Package format and architecture, e.g. ".exe · 64-bit". */
  detail: string;
  /**
   * Direct download URL. Null until a build is published — the button then
   * renders as an inert "coming soon" rather than a link to nowhere.
   */
  url: string | null;
};
