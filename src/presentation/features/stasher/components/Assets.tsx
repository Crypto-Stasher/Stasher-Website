import React from 'react';
import type { AssetsContent } from '../../../../domain/models/sections';

interface AssetsProps {
  content: AssetsContent;
}

export const Assets: React.FC<AssetsProps> = ({ content }) => {
  return (
    <section id="assets" className="section-dark" style={{ textAlign: 'center' }}>
      <div className="container">
        <p className="section-title">Asset Deployment</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>
        <div className="stagger" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {content.items.map((asset, index) => (
            <span key={index} className="asset-badge stagger-item">{asset}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
