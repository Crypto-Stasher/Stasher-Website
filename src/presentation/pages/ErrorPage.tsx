import React from 'react';
import { Radar } from '@features/stasher/components/Radar';
import { ThemeToggle } from '../shared/components/ThemeToggle';

interface ErrorPageProps {
  is404: boolean;
}

// Standalone by design: rendered by vike's _error page (outside the router
// and AuthProvider) AND by the react-router catch-all route. So: no Link,
// no useAuth, no Layout — a plain <a> works in both worlds.
export const ErrorPage: React.FC<ErrorPageProps> = ({ is404 }) => {
  return (
    <div className="layout-root error-page">
      <div className="bg-grid" aria-hidden="true"></div>

      {/* ThemeToggle also runs the theme init (localStorage / system preference),
          which normally happens in the nav — the error page has no nav. */}
      <div className="error-theme-toggle">
        <ThemeToggle />
      </div>

      <main className="error-content">
        <div className="error-visual">
          <Radar />
          <div className="error-code">{is404 ? '404' : '500'}</div>
        </div>

        <span className="tech-tag">{is404 ? 'PAGE NOT FOUND' : 'SOMETHING WENT WRONG'}</span>

        <h1 className="error-title">
          {is404 ? 'This page does not exist.' : 'Something broke on our side.'}
        </h1>

        <p className="error-desc">
          {is404
            ? 'The address may be mistyped, or the page may have moved. Your crypto is fine — this page just is not here.'
            : 'Not your fault, and nothing of yours was affected. Try again in a moment.'}
        </p>

        <a href="/" className="cta-button">
          Back to safety
        </a>

        <div className="node-label error-footer">Offline security, made simple.</div>
      </main>
    </div>
  );
};
