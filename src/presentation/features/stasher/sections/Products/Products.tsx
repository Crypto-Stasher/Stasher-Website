import React from 'react';
import type { ProductsContent } from '../../../../../domain/models/sections';

interface ProductsProps {
  content: ProductsContent;
}

export const Products: React.FC<ProductsProps> = ({ content }) => {
  return (
    <section id="products" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>

        <div className="products-grid">
          {content.tiers.map((tier, idx) => (
            <div key={tier.id} className={`product-card ${idx === 0 ? 'reveal-left' : 'reveal-right'} ${tier.highlight ? 'product-card--highlight' : ''}`}>
              <div className="product-header">
                <h3 className="product-name">{tier.name}</h3>
                <p className="product-tagline">{tier.tagline}</p>
              </div>
              <ul className="product-features">
                {tier.features.map((feature, fidx) => (
                  <li key={fidx} className="product-feature">
                    <span className="product-check">&#x25B8;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
