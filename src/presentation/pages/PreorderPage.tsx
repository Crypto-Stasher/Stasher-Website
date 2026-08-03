import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PreorderRepository } from '@repositories/PreorderRepository';
import { COUNTRIES } from '../../domain/countries';
import { useScrollReveal } from '@hooks';

type Status = 'idle' | 'sending' | 'success' | 'error';

const MAX_QUANTITY = 5;

// Unpaid reservation (WEB-1/WEB-2 v1). Nothing is charged and no address is
// collected: until a payment processor and a price exist, this only captures
// intent, which keeps the page clear of payment and shipping-data obligations.
export const PreorderPage: React.FC = () => {
  useScrollReveal(true);

  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    // Hidden field humans never see and bots auto-fill; the API silently
    // drops those submissions.
    const honeypot = (new FormData(e.currentTarget).get('website') as string) ?? '';

    const result = await PreorderRepository.reserve(email, country, quantity, honeypot);

    if (result.ok) {
      setStatus('success');
    } else {
      setError(result.error);
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <div className="security-page preorder-page">
      <header className="security-page-hero container">
        <p className="section-title">Reserve</p>
        <h1 className="section-heading">Reserve your Stasher</h1>

        {status === 'success' ? (
          <div className="preorder-success" role="status">
            <p className="section-description">
              You're on the list. We'll email you as soon as Stasher is available to order —
              you'll get first access, and no payment is due until then.
            </p>
            <Link to="/" className="hero-text-link">
              <span aria-hidden="true">←</span> Back to the homepage
            </Link>
          </div>
        ) : (
          <>
            <p className="section-description">
              Stasher isn't on sale yet. Reserve a place in the queue and we'll notify you the
              moment it ships. <strong>No payment now</strong> — reserving costs nothing and
              commits you to nothing.
            </p>

            <form className="preorder-form" onSubmit={handleSubmit}>
              <div className="preorder-field">
                <label htmlFor="preorder-email">Email</label>
                <input
                  id="preorder-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sending}
                />
              </div>

              <div className="preorder-row">
                <div className="preorder-field">
                  <label htmlFor="preorder-country">Shipping to</label>
                  <select
                    id="preorder-country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={sending}
                  >
                    <option value="" disabled>Choose your country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="preorder-field preorder-field--narrow">
                  <label htmlFor="preorder-quantity">How many</label>
                  <select
                    id="preorder-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={sending}
                  >
                    {Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="preorder-honeypot" aria-hidden="true" />

              {status === 'error' && (
                <p className="preorder-error" role="alert">{error}</p>
              )}

              <button type="submit" className="cta-button preorder-submit" disabled={sending}>
                <span>{sending ? 'Reserving…' : 'Reserve my Stasher'}</span>
              </button>

              <p className="preorder-fineprint">
                We'll only use your email to tell you about your reservation. No spam, and you
                can ask us to remove you at any time.
              </p>
            </form>
          </>
        )}
      </header>
    </div>
  );
};
