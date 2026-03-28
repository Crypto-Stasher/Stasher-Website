import React from 'react';
import { Layout } from './presentation/shared/components/Layout';
import { StasherPage } from './presentation/pages/StasherPage';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { useScrollReveal } from '@hooks';

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
      <StasherPage content={content} />
    </Layout>
  );
};

export default App;
