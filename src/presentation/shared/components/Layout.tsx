import React, { useMemo, useState } from 'react';
import { useActiveSection, useCursorGlow, useSmoothScroll } from '@hooks';
import { HUD } from './HUD';
import type { FooterContent } from '@models/sections';

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
          <div className="logo nav-logo-container">
            <svg viewBox="0 0 220 40" width="132" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M30,10 L10,10 L10,20 L30,20 L30,30 L10,30" />
              <path d="M40,10 L60,10 M50,10 L50,30" />
              <path d="M70,30 L80,10 L90,30 M75,20 L85,20" />
              <path d="M120,10 L100,10 L100,20 L120,20 L120,30 L100,30" />
              <path d="M130,10 L130,30 M150,10 L150,30 M130,20 L150,20" />
              <path d="M180,10 L160,10 L160,30 L180,30 M160,20 L175,20" />
              <path d="M190,30 L190,10 L210,10 L210,20 L190,20 L210,30" />
            </svg>
            <span className="tech-tag nav-tech-tag">V2.1</span>
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
            {navLinks.map((link) => (
              <a
                key={link.href}
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
              <div className="logo footer-logo-container">
                <svg viewBox="0 0 220 40" width="132" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M30,10 L10,10 L10,20 L30,20 L30,30 L10,30" />
                  <path d="M40,10 L60,10 M50,10 L50,30" />
                  <path d="M70,30 L80,10 L90,30 M75,20 L85,20" />
                  <path d="M120,10 L100,10 L100,20 L120,20 L120,30 L100,30" />
                  <path d="M130,10 L130,30 M150,10 L150,30 M130,20 L150,20" />
                  <path d="M180,10 L160,10 L160,30 L180,30 M160,20 L175,20" />
                  <path d="M190,30 L190,10 L210,10 L210,20 L190,20 L210,30" />
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
            <p className="footer-copyright">{footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
