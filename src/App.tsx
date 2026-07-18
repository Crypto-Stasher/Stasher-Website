import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './presentation/shared/components/Layout';
import { StasherPage } from './presentation/pages/StasherPage';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { AuthPage } from './presentation/pages/AuthPage';
import { ErrorPage } from './presentation/pages/ErrorPage';

const App: React.FC = () => {
  const content = ContentRepository.getContent();

  const navLinks = [
    { href: "#device", label: "Device" },
    { href: "#architecture", label: "How it works" },
    { href: "#security", label: "Security" },
    { href: "#app", label: "App" },
    { href: "#products", label: "Get Stasher" },
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
      {/* Prod nginx serves index.html for any unknown URL — without this
          catch-all, those URLs render a blank page. */}
      <Route path="*" element={<ErrorPage is404 />} />
    </Routes>
  );
};

export default App;
