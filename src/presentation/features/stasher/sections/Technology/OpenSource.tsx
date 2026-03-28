import React from 'react';
import type { OpenSourceContent } from '../../../../../domain/models/sections';

interface OpenSourceProps {
  content: OpenSourceContent;
}

export const OpenSource: React.FC<OpenSourceProps> = ({ content }) => {
  return (
    <section id="open-source" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>
        <p className="section-description reveal">{content.description}</p>

        <div className="opensource-grid stagger">
          {content.points.map((point, idx) => (
            <div key={idx} className="opensource-card stagger-item">
              <div className="opensource-number">{String(idx + 1).padStart(2, '0')}</div>
              <h3 className="opensource-title">{point.title}</h3>
              <p className="opensource-desc">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
