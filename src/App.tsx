import React from 'react';
import { Layout } from './presentation/shared/components/Layout';
import {
  Hero,
  Stats,
  Architecture,
  Security,
  HowItWorks,
  Differentiators,
  Products,
  AppShowcase,
  Comparison,
  TechStack,
  OpenSource,
  Compliance,
  Faq,
  Assets,
  Newsletter,
} from './presentation/features/stasher/components/StasherFeature';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { useScrollReveal } from './application/hooks/useScrollReveal';

const App: React.FC = () => {
  useScrollReveal();

  const content = ContentRepository.getContent();

  const navLinks = [
    { href: "#differentiators", label: "WHY STASHER" },
    { href: "#architecture", label: "HOW IT WORKS" },
    { href: "#security", label: "SECURITY" },
    { href: "#products", label: "PRODUCTS" },
    { href: "#compare", label: "COMPARE" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <Layout footer={content.footer} navLinks={navLinks}>
      <Hero content={content.hero} />
      <Stats content={content.stats} />
      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />
      <Architecture content={content.architecture} />
      <HowItWorks content={content.howItWorks} />
      <Security content={content.security} />
      <AppShowcase content={content.appShowcase} />
      <Products content={content.products} />
      <Comparison content={content.comparison} />
      <TechStack content={content.techStack} />
      <OpenSource content={content.openSource} />
      <Compliance content={content.compliance} />
      <Assets content={content.assets} />
      <Faq content={content.faq} />
      <Newsletter content={content.newsletter} />
    </Layout>
  );
};

export default App;
