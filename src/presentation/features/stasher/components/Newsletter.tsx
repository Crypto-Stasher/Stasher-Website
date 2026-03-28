import React from 'react';
import type { NewsletterContent } from '../../../../domain/models/sections';

interface NewsletterProps {
  content: NewsletterContent;
}

export const Newsletter: React.FC<NewsletterProps> = ({ content }) => {
  return (
    <section id="newsletter" className="container">
      <div className="newsletter-box reveal-scale">
        <h2 className="newsletter-title">{content.title}</h2>
        <p className="newsletter-desc">{content.description}</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className="newsletter-input"
            placeholder={content.placeholder}
            required
          />
          <button type="submit" className="cta-button">{content.cta}</button>
        </form>
      </div>
    </section>
  );
};
