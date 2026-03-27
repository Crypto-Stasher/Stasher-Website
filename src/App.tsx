import React from 'react';
import { Layout } from './presentation/shared/components/Layout';
import {
  Hero,
  Architecture,
  Security,
  HowItWorks,
  Differentiators,
  Products,
  TechStack,
  Compliance,
  Assets,
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
    { href: "#tech", label: "TECH" },
    { href: "#compliance", label: "COMPLIANCE" },
  ];

  return (
    <Layout footer={content.footer} navLinks={navLinks}>
      <Hero content={content.hero} />
      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />
      <Architecture content={content.architecture} />
      <HowItWorks content={content.howItWorks} />
      <Security content={content.security} />
      <Products content={content.products} />
      <TechStack content={content.techStack} />
      <Compliance content={content.compliance} />
      <Assets content={content.assets} />
    </Layout>
  );
};

export default App;
