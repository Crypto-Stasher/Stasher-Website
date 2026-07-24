import React from 'react';
import type { TrustSignalsContent } from '@models/sections';

interface TrustSignalsProps {
  content: TrustSignalsContent;
}

export const TrustSignals: React.FC<TrustSignalsProps> = ({ content }) => {
  return (
    <section className="trust-bar" aria-label="Key security guarantees">
      <div className="container">
        <ul className="trust-grid stagger">
          {content.items.map((item) => (
            <li key={item.label} className="trust-item stagger-item">
              <span className="trust-check" aria-hidden="true">&#x2713;</span>
              <span className="trust-text">
                <span className="trust-label">{item.label}</span>
                <span className="trust-sub">{item.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
