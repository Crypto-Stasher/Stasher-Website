import React from 'react';
import type { AppShowcaseContent } from '../../../../../domain/models/sections';

interface AppShowcaseProps {
  content: AppShowcaseContent;
}

export const AppShowcase: React.FC<AppShowcaseProps> = ({ content }) => {
  return (
    <section id="app" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>
      <p className="section-description reveal">{content.description}</p>

      <div className="app-grid stagger">
        {content.features.map((feature, idx) => (
          <div key={idx} className="app-feature-card stagger-item">
            <div className="app-feature-number">{String(idx + 1).padStart(2, '0')}</div>
            <h3 className="app-feature-title">{feature.title}</h3>
            <p className="app-feature-desc">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="app-download reveal-scale">
        <p className="app-download-label">AVAILABLE ON</p>
        <div className="app-download-buttons">
          {content.downloadLinks.map((link) => (
            <a key={link.platform} href={link.url} className="app-download-btn">
              {link.platform === 'iOS' ? 'App Store' : 'Google Play'}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
