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
  Stats,
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
      <Hero content={content.hero} />
      <Stats content={content.stats} />
      <Exploded />
      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />
      <SectionTransition variant="airgap" />

      <Architecture content={content.architecture} />
      <HowItWorks content={content.howItWorks} />
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
