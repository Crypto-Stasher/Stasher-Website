import type { NavLinkPreview } from './NavLinkPreview.type';

/** Either a homepage section anchor (`href`) or a standalone route (`to`). */
export type NavLink = {
  label: string;
  href?: string;
  to?: string;
  /** Route links only: opens a hover card on pointer devices. */
  preview?: NavLinkPreview;
};
