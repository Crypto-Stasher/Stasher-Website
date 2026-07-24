import React from 'react';
import { Link } from 'react-router-dom';
import { SECURITY_PAGE_CONTENT } from '../../domain/securityPageContent';
import { useScrollReveal } from '@hooks';

export const SecurityPage: React.FC = () => {
  useScrollReveal(true);
  const content = SECURITY_PAGE_CONTENT;

  return (
    <div className="security-page">
      <header className="security-page-hero container">
        <p className="section-title">{content.kicker}</p>
        <h1 className="section-heading reveal-blur">{content.title}</h1>
        <p className="section-description reveal">{content.intro}</p>
      </header>

      {content.sections.map((section) => (
        <section key={section.id} id={section.id} className="security-page-section container">
          <p className="section-title">{section.kicker}</p>
          <h2 className="section-heading reveal-blur">{section.title}</h2>
          <p className="section-description reveal">{section.body}</p>

          {section.items && (
            <div className="security-grid stagger">
              {section.items.map((item, idx) => (
                <div key={idx} className="security-card stagger-item">
                  <div className="security-id">{String(idx + 1).padStart(2, '0')}</div>
                  <h3 className="security-title">{item.title}</h3>
                  <p className="security-desc">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <div className="security-page-back container">
        <Link to="/" className="hero-text-link">
          <span aria-hidden="true">←</span> Back to the homepage
        </Link>
      </div>
    </div>
  );
};
