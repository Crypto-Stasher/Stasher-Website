import React, { useMemo, useState } from 'react';
import { useCursorGlow } from '../../../application/hooks/useCursorGlow';
import { useSmoothScroll } from '../../../application/hooks/useSmoothScroll';
import { useActiveSection } from '../../../application/hooks/useActiveSection';
import { HUD } from './HUD';
import type { FooterContent } from '../../../domain/models/sections';

interface LayoutProps {
  children: React.ReactNode;
  footer: FooterContent;
  navLinks: { href: string; label: string }[];
}

export const Layout: React.FC<LayoutProps> = ({ children, footer, navLinks }) => {
  useCursorGlow();
  const scrollTo = useSmoothScroll();
  const sectionIds = useMemo(() => navLinks.map(l => l.href), [navLinks]);
  const activeSection = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    scrollTo(e);
  };

  return (
    <div className="layout-root">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <div className="bg-grid" aria-hidden="true"></div>
      <div className="scanline" aria-hidden="true"></div>
      <div className="cursor-glow" aria-hidden="true"></div>

      <HUD />

      <nav>
        <div className="container nav-content">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 200 40" width="120" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M10,30 L20,10 L30,30" />
              <path d="M15,20 L25,20" />
              <rect x="40" y="10" width="20" height="20" />
              <path d="M70,30 L70,10 L90,10 L90,18 L70,18 L90,30" />
              <path d="M100,10 L120,10 L110,10 L110,30" />
              <path d="M130,30 L130,10 L150,10 L150,18 L130,18 L150,18 L150,22 L130,22" />
              <path d="M160,30 L160,10 C180,10 180,20 160,20 L180,30" />
            </svg>
            <span className="tech-tag" style={{ marginLeft: '0.5rem', verticalAlign: 'middle', marginBottom: 0 }}>V2.1</span>
          </div>
          <button
            className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={handleNavClick}
                className={activeSection === link.href ? 'nav-active' : ''}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main id="main-content">{children}</main>

      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 200 40" width="120" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M10,30 L20,10 L30,30" />
                  <path d="M15,20 L25,20" />
                  <rect x="40" y="10" width="20" height="20" />
                  <path d="M70,30 L70,10 L90,10 L90,18 L70,18 L90,30" />
                  <path d="M100,10 L120,10 L110,10 L110,30" />
                  <path d="M130,30 L130,10 L150,10 L150,18 L130,18 L150,18 L150,22 L130,22" />
                  <path d="M160,30 L160,10 C180,10 180,20 160,20 L180,30" />
                </svg>
              </div>
              <div className="node-label">{footer.transmission}</div>
            </div>
            <div className="footer-socials">
              {footer.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>{footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
