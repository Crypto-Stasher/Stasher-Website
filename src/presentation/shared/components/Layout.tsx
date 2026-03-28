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
          <div className="logo">
            STASHER<span className="tech-tag" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>V2.1</span>
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
              <div className="logo" style={{ marginBottom: '1rem' }}>STASHER</div>
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
