import React from 'react';
import type { SecurityContent } from '@models/sections';

interface SecurityProps {
  content: SecurityContent;
}

export const Security: React.FC<SecurityProps> = ({ content }) => {
  return (
    <section id="security" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>
      <p className="section-description reveal">{content.description}</p>

      <div className="security-grid stagger">
        {content.features.map((feature) => (
          <div key={feature.id} className="security-card stagger-item">
            <div className="security-icon">{feature.icon}</div>
            <div className="security-id">{feature.id}</div>
            <h3 className="security-title">{feature.title}</h3>
            <p className="security-desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
