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
            key={item.question}
            className="stagger-item"
          >
            <div className={`faq-item ${openIndex === idx ? 'faq-item--open' : ''}`}>
              <button
                id={`faq-q-${idx}`}
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-a-${idx}`}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">{openIndex === idx ? '\u2212' : '+'}</span>
              </button>
              <div
                id={`faq-a-${idx}`}
                className="faq-answer"
                role="region"
                aria-labelledby={`faq-q-${idx}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
