import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './presentation/shared/components/Layout';
import { StasherPage } from './presentation/pages/StasherPage';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { AuthPage } from './presentation/pages/AuthPage';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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
    <Routes>
      <Route
        path="/"
        element={
          <Layout footer={content.footer} navLinks={navLinks}>
            <StasherPage content={content} />
          </Layout>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
