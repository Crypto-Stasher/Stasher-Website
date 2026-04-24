import React from 'react';
import {
  AppShowcase,
  Architecture,
  Assets,
  Comparison,
  Compliance,
  Differentiators,
  Faq,
  Hero,
  HowItWorks,
  Newsletter,
  OpenSource,
  Products,
  Security,
  Stats,
} from '@features/stasher/sections';
import { Divider } from '@features/stasher/components';
import type { SiteContent } from '@models/SiteContent.type';
import { useScrollReveal } from '@hooks';

interface StasherPageProps {
  content: SiteContent;
}

export const StasherPage: React.FC<StasherPageProps> = ({ content }) => {
  useScrollReveal(true);
  return (
    <>
      <Hero content={content.hero} />
      <Stats content={content.stats} />

      <Divider variant="glow" />
      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />

      <Architecture content={content.architecture} />
      <Divider variant="dots" />
      <HowItWorks content={content.howItWorks} />

      <Divider variant="glow" />
      <Security content={content.security} />

      <Divider variant="dots" />
      <AppShowcase content={content.appShowcase} />

      <Products content={content.products} />
      <Divider variant="glow" />
      <Comparison content={content.comparison} />

      <Divider variant="dots" />
      <OpenSource content={content.openSource} />
      <Divider variant="glow" />
      <Compliance content={content.compliance} />

      <Assets content={content.assets} />
      <Divider variant="dots" />
      <Faq content={content.faq} />

      <Divider variant="glow" />
      <Newsletter content={content.newsletter} />
    </>
  );
};
