import React from 'react';
import {
  Differentiators,
  Faq,
  Hero,
  Newsletter,
} from '@features/stasher/sections';
import type { SiteContent } from '@models/SiteContent.type';
import { useScrollReveal } from '@hooks';

interface StasherPageProps {
  content: SiteContent;
}

export const StasherPage: React.FC<StasherPageProps> = ({ content }) => {
  useScrollReveal(true);
  return (
    <>
      {/* ── Home = the argument, /product = the device ──────────────
          hero → why → faq → newsletter. Anything describing the
          device itself (features, coins, specs, box contents, the sending
          flow, the architecture) lives only on /product and /security, so no
          claim is made twice on the site. */}
      <Hero content={content.hero} />

      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />

      <Faq content={content.faq} />

      <Newsletter content={content.newsletter} />
    </>
  );
};
