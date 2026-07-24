import React from 'react';
import { Link } from 'react-router-dom';

interface LegalPageProps {
  title: string;
  body: string[];
}

// Honest placeholder for pre-launch legal pages (WEB-6 footer stubs).
// Real Privacy Policy / Terms are published before launch (MiCA later).
export const LegalPage: React.FC<LegalPageProps> = ({ title, body }) => {
  return (
    <div className="security-page">
      <header className="security-page-hero container">
        <p className="section-title">Legal</p>
        <h1 className="section-heading">{title}</h1>
        {body.map((para, idx) => (
          <p key={idx} className="section-description">{para}</p>
        ))}
      </header>
      <div className="security-page-back container">
        <Link to="/" className="hero-text-link">
          <span aria-hidden="true">←</span> Back to the homepage
        </Link>
      </div>
    </div>
  );
};
