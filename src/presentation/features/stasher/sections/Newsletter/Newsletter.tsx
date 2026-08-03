import React, { useState } from 'react';
import type { NewsletterContent } from '@models/sections';
import { NewsletterRepository } from '@repositories/NewsletterRepository';

interface NewsletterProps {
  content: NewsletterContent;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export const Newsletter: React.FC<NewsletterProps> = ({ content }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    // The hidden "website" field is a honeypot: humans never see it, bots
    // auto-fill it, and the backend silently drops those submissions.
    const honeypot = (new FormData(e.currentTarget).get('website') as string) ?? '';

    const result = await NewsletterRepository.subscribe(email, honeypot);

    if (result.ok) {
      setStatus('success');
    } else {
      setError(result.error);
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="container">
      <div className="newsletter-box reveal-scale">
        <h2 className="newsletter-title">{content.title}</h2>
        <p className="newsletter-desc">{content.description}</p>

        {status === 'success' ? (
          <p className="newsletter-success" role="status">
            You're in! We'll keep you posted.
          </p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder={content.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending'}
              required
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
            />
            <button type="submit" className="cta-button" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : content.cta}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="newsletter-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};
