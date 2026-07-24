import React, { lazy, Suspense } from 'react';
import type { AssetsContent } from '@models/sections';
import { CoinIcon } from '@features/stasher/components/CoinIcon';

// Decorative only, and three.js is already the heaviest dependency here —
// so it loads after the section's content rather than blocking it.
const FloatingCoins = lazy(
  () => import('@features/stasher/components/FloatingCoins/FloatingCoins')
    .then((module) => ({ default: module.FloatingCoins })),
);

interface AssetsProps {
  content: AssetsContent;
}

export const Assets: React.FC<AssetsProps> = ({ content }) => {
  return (
    <section id="assets" className="section-dark assets-section">
      <Suspense fallback={null}>
        <FloatingCoins />
      </Suspense>

      <div className="container">
        <p className="section-title">Supported coins</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>
        <div className="stagger assets-grid">
          {content.items.map((asset, index) => (
            <div key={index} className="stagger-item">
              <CoinIcon name={asset} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
