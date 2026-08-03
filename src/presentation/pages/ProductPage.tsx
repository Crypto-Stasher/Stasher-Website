import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_PAGE_CONTENT } from '../../domain/productPageContent';
import { Assets } from '@features/stasher/sections';
import { ProductCard, SpecsDialog } from '@features/stasher/components';
import { useScrollReveal } from '@hooks';

// Dedicated single-product page (/product). This page owns everything about
// the device itself — what it does, what it ships with and its specs. The
// homepage argues why Stasher exists and links here; no claim is made in both
// places. The interactive 3D model belongs to the homepage hero and is
// deliberately not repeated here — this page uses the studio still.
export const ProductPage: React.FC = () => {
  useScrollReveal(true);
  const content = PRODUCT_PAGE_CONTENT;
  const [specsOpen, setSpecsOpen] = useState(false);
  const closeSpecs = useCallback(() => setSpecsOpen(false), []);

  return (
    <div className="product-page">
      <header className="product-hero">
        <div className="container product-hero-layout">
          <div className="product-hero-copy">
            <p className="section-title">{content.kicker}</p>
            <h1 className="product-hero-name">{content.name}</h1>
            <p className="product-hero-tagline">{content.tagline}</p>
            <p className="section-description">{content.intro}</p>
          </div>

          <div className="product-hero-stage">
            <ProductCard
              name={content.name}
              tagline={content.tagline}
              availability={content.availability}
              onOpenSpecs={() => setSpecsOpen(true)}
            />
          </div>
        </div>
      </header>

      <section id="product-features" className="container product-section">
        <p className="section-title">What it does</p>
        <h2 className="section-heading reveal-blur">In your hand, nothing moves without you</h2>

        <div className="product-feature-list stagger">
          {content.features.map((feature) => (
            <article key={feature.id} className="product-feature-block stagger-item">
              <span className="product-feature-id">{feature.id}</span>
              <div>
                <h3 className="product-feature-title">{feature.title}</h3>
                <p className="product-feature-desc">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Assets content={content.assets} />

      <SpecsDialog
        open={specsOpen}
        onClose={closeSpecs}
        title={content.name}
        specGroups={content.specGroups}
        note="Specifications are preliminary and may change before production."
      />

      <section id="in-the-box" className="container product-section">
        <p className="section-title">In the box</p>
        <h2 className="section-heading reveal-blur">What you get</h2>
        <ul className="product-box-list stagger">
          {content.inTheBox.map((item) => (
            <li key={item} className="product-box-item stagger-item">
              <span className="product-check" aria-hidden="true">&#x25B8;</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="container product-closing reveal">
        <h2 className="section-heading">Ready when you are</h2>
        <p className="section-description">{content.availability}</p>
        <div className="product-hero-cta">
          <Link to="/preorder" className="cta-button">
            <span>Reserve yours</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/security" className="hero-text-link">
            Read the security architecture
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
