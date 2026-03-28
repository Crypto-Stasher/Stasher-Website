import React, { useState } from 'react';
import type { FaqContent } from '../../../../domain/models/sections';

interface FaqProps {
  content: FaqContent;
}

export const Faq: React.FC<FaqProps> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>

      <div className="faq-list stagger">
        {content.items.map((item, idx) => (
          <div
            key={idx}
            className="stagger-item"
          >
            <div className={`faq-item ${openIndex === idx ? 'faq-item--open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">{openIndex === idx ? '\u2212' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
