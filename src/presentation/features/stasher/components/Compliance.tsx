import React from 'react';
import type { ComplianceContent } from '../../../../domain/models/sections';

interface ComplianceProps {
  content: ComplianceContent;
}

export const Compliance: React.FC<ComplianceProps> = ({ content }) => {
  return (
    <section id="compliance" style={{ background: 'rgba(0, 242, 254, 0.01)', borderTop: '1px solid var(--border-neon)', borderBottom: '1px solid var(--border-neon)' }}>
      <div className="container">
        <p className="section-title">Operations & Audit</p>
        <h2 className="section-heading reveal-left" style={{ textAlign: 'left' }}>{content.title}</h2>
        <p className="reveal" style={{ maxWidth: '700px', color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '4rem' }}>{content.description}</p>
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
