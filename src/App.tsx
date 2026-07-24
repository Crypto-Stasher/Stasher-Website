import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './presentation/shared/components/Layout';
import { StasherPage } from './presentation/pages/StasherPage';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { SecurityPage } from './presentation/pages/SecurityPage';
import { LegalPage } from './presentation/pages/LegalPage';
import { ErrorPage } from './presentation/pages/ErrorPage';

const PRIVACY_BODY = [
  'Stasher is built around self-custody: your keys and recovery phrase live on your device, never on our servers. We are preparing our full Privacy Policy and will publish it here before launch.',
  'It will cover exactly what limited data the website and companion app handle, how we treat it, and the choices you have.',
];

const TERMS_BODY = [
  'Our full Terms of Service are being finalised and will be published here before launch.',
  'They will set out the terms for using the Stasher website, companion app, and device, including warranty and liability terms. Using the site today is subject to these terms once published.',
];

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
      <Route
        path="/security"
        element={
          <Layout footer={content.footer} navLinks={navLinks}>
            <SecurityPage />
          </Layout>
        }
      />
      <Route
        path="/privacy"
        element={
          <Layout footer={content.footer} navLinks={navLinks}>
            <LegalPage title="Privacy Policy" body={PRIVACY_BODY} />
          </Layout>
        }
      />
      <Route
        path="/terms"
        element={
          <Layout footer={content.footer} navLinks={navLinks}>
            <LegalPage title="Terms of Service" body={TERMS_BODY} />
          </Layout>
        }
      />
      {/* Prod nginx serves index.html for any unknown URL — without this
          catch-all, those URLs render a blank page. */}
      <Route path="*" element={<ErrorPage is404 />} />
    </Routes>
  );
};

export default App;
