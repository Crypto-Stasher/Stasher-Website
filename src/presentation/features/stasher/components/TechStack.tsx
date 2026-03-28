import React from 'react';
import type { TechStackContent } from '../../../../domain/models/sections';

interface TechStackProps {
  content: TechStackContent;
}

export const TechStack: React.FC<TechStackProps> = ({ content }) => {
  return (
    <section id="tech" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>

      <div className="tech-grid stagger">
        {content.items.map((item) => (
          <div key={item.name} className="tech-item stagger-item">
            <div className="tech-category">{item.category}</div>
            <div className="tech-name">{item.name}</div>
            <div className="tech-detail">{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
