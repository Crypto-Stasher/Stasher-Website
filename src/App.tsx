import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './presentation/shared/components/Layout';
import { StasherPage } from './presentation/pages/StasherPage';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { AuthPage } from './presentation/pages/AuthPage';

const App: React.FC = () => {
  const content = ContentRepository.getContent();

  const navLinks = [
    { href: "#differentiators", label: "Why Stasher" },
    { href: "#architecture", label: "How it works" },
    { href: "#security", label: "Security" },
    { href: "#products", label: "Products" },
    { href: "#compare", label: "Compare" },
    { href: "#faq", label: "FAQ" },
  ];

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
