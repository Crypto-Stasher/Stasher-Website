import React from 'react';
import {
  AppShowcase,
  Architecture,
  Differentiators,
  Faq,
  Hero,
  Newsletter,
  OpenSource,
} from '@features/stasher/sections';
import type { SiteContent } from '@models/SiteContent.type';
import { useScrollReveal } from '@hooks';
import { SectionTransition } from '@features/stasher/components';

interface StasherPageProps {
  content: SiteContent;
}

export const StasherPage: React.FC<StasherPageProps> = ({ content }) => {
  useScrollReveal(true);
  return (
    <>
      {/* ── Home = the argument, /product = the device ──────────────
          hero → why → how it works → app → assurance → faq →
          newsletter. Anything describing the device itself (features,
          coins, specs, box contents, the sending flow) lives only on
          /product, so no claim is made twice on the site. */}
      <Hero content={content.hero} />

      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />
      <SectionTransition variant="airgap" />

      <Architecture content={content.architecture} />
      <SectionTransition variant="verify" />

      <AppShowcase content={content.appShowcase} />
      <SectionTransition variant="pair" />

      <OpenSource content={content.openSource} />

      <Faq content={content.faq} />

      <Newsletter content={content.newsletter} />
    </>
  );
};
