import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DEVICE_IMAGE } from './presentation/shared/deviceImage';
import type { NavLink } from '@models/sections';
import { Layout } from './presentation/shared/components/Layout';
import { StasherPage } from './presentation/pages/StasherPage';
import { ContentRepository } from './infrastructure/repositories/ContentRepository';
import { SecurityPage } from './presentation/pages/SecurityPage';
import { ProductPage } from './presentation/pages/ProductPage';
import { PreorderPage } from './presentation/pages/PreorderPage';
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

  // `to` entries are real routes; `href` entries are homepage anchors.
  const navLinks: NavLink[] = [
    {
      to: "/product",
      label: "Product",
      preview: {
        image: DEVICE_IMAGE,
        kicker: "The device",
        title: "Stasher",
        description: "The personal crypto safe. Keys sealed in a certified secure element, approved by your thumb.",
        points: ["JIL High secure element", "Cold and warm, separated", "Thousands of coins"],
        cta: "See the product",
      },
    },
    { href: "#architecture", label: "How it works" },
    { href: "#app", label: "App" },
    { to: "/security", label: "Security" },
    { to: "/preorder", label: "Get Stasher" },
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
        path="/product"
        element={
          <Layout footer={content.footer} navLinks={navLinks}>
            <ProductPage />
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
        path="/preorder"
        element={
          <Layout footer={content.footer} navLinks={navLinks}>
            <PreorderPage />
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
