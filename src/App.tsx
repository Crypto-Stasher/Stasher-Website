import React from 'react';
import { Layout } from './presentation/shared/components/Layout';
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
  TechStack,
} from './presentation/features/stasher/sections';
import { Divider } from './presentation/features/stasher/components';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { useScrollReveal } from './application/hooks/useScrollReveal';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useScrollReveal(!loading);

  const content = ContentRepository.getContent();

  const navLinks = [
    { href: "#differentiators", label: "WHY STASHER" },
    { href: "#architecture", label: "HOW IT WORKS" },
    { href: "#security", label: "SECURITY" },
    { href: "#products", label: "PRODUCTS" },
    { href: "#compare", label: "COMPARE" },
    { href: "#faq", label: "FAQ" },
  ];

  if (loading) {
    return (
      <div className="app-loading-screen">
        <div className="loading-spinner" />
        <div>INITIALIZING SECURE ENVIRONMENT...</div>
      </div>
    );
  }

  return (
    <Layout footer={content.footer} navLinks={navLinks}>
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
      <TechStack content={content.techStack} />

      <OpenSource content={content.openSource} />
      <Divider variant="glow" />
      <Compliance content={content.compliance} />

      <Assets content={content.assets} />
      <Divider variant="dots" />
      <Faq content={content.faq} />

      <Divider variant="glow" />
      <Newsletter content={content.newsletter} />
    </Layout>
  );
};

export default App;
