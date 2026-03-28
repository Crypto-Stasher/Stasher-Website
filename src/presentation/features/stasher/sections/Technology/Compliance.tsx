import React from 'react';
import type { ComplianceContent } from '@models/sections';

interface ComplianceProps {
  content: ComplianceContent;
}

export const Compliance: React.FC<ComplianceProps> = ({ content }) => {
  return (
    <section id="compliance" className="compliance-section">
      <div className="container">
        <p className="section-title">Operations & Audit</p>
        <h2 className="section-heading reveal-left compliance-heading">{content.title}</h2>
        <p className="reveal compliance-description">{content.description}</p>
        <div className="compliance-list stagger">
          {content.points.map((point, index) => (
            <div key={index} className="compliance-item stagger-item">
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
