import React from 'react';
import { Layout } from './presentation/shared/components/Layout';
import { Hero, Differentiators, Compliance, Assets } from './presentation/features/stasher/components/StasherFeature';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { useScrollReveal } from './application/hooks/useScrollReveal';

const App: React.FC = () => {
  useScrollReveal();

  // COMPOSITION ROOT:
  // Fetch dependencies from Infrastructure/Domain and inject into Presentation
  const content = ContentRepository.getContent();

  const navLinks = [
    { href: "#differentiators", label: "SYS_INFO" },
    { href: "#compliance", label: "COMPLIANCE" },
    { href: "#assets", label: "DEPLOYMENT" }
  ];

  return (
    <Layout footer={content.footer} navLinks={navLinks}>
      <Hero content={content.hero} />
      <Differentiators title={content.differentiators.title} items={content.differentiators.items} />
      <Compliance content={content.compliance} />
      <Assets content={content.assets} />
    </Layout>
  );
};

export default App;
