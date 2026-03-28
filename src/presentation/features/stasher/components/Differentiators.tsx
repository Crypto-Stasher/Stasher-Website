import React from 'react';
import type { DifferentiatorItem } from '../../../../domain/models/sections';

interface DifferentiatorsProps {
  title: string;
  items: DifferentiatorItem[];
}

export const Differentiators: React.FC<DifferentiatorsProps> = ({ title, items }) => {
  return (
    <section id="differentiators" className="container">
      <p className="section-title">Institutional Core</p>
      <h2 className="section-heading reveal-blur">{title}</h2>
      <div className="features-grid stagger">
        {items.map((item) => (
          <div key={item.id} className="feature-card stagger-item">
            <div className="glare" />
            <div className="node-label">{item.id} // {item.label}</div>
            <h3>{item.title}</h3>
            <p className="diff-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
