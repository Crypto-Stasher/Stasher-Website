import React from 'react';
import {
  AppShowcase,
  Architecture,
  Assets,
  Comparison,
  Differentiators,
  Exploded,
  Faq,
  Hero,
  HowItWorks,
  Newsletter,
  OpenSource,
  Products,
  Security,
  TrustSignals,
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
      {/* ── Mainstream-first journey (WEB-6 P2) ────────────────────
          hero → trust → simple 3-step → product → why → deep → app →
          buy → compare → assurance → coins → faq → newsletter */}
      <Hero content={content.hero} />
      <TrustSignals content={content.trustSignals} />

      <HowItWorks content={content.howItWorks} />

      <Exploded />
      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />
      <SectionTransition variant="airgap" />

      <Architecture content={content.architecture} />
      <SectionTransition variant="verify" />

      <Security content={content.security} />

      <AppShowcase content={content.appShowcase} />
      <SectionTransition variant="pair" />

      <Products content={content.products} />
      <Comparison content={content.comparison} />

      <OpenSource content={content.openSource} />

      <Assets content={content.assets} />
      <Faq content={content.faq} />

      <Newsletter content={content.newsletter} />
    </>
  );
};
