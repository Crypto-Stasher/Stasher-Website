import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useActiveSection, useCursorGlow, useSmoothScroll } from '@hooks';
import { ThemeToggle } from './ThemeToggle';
import type { FooterContent } from '@models/sections';
import { StasherBrand } from './StasherBrand';

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

  // Section anchors only exist on the homepage. On the standalone pages
  // (/security, /privacy, /terms) they must route home to that anchor
  // instead of trying to smooth-scroll to a section that isn't there.
  const isHome = useLocation().pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    scrollTo(e);
  };

  return (
    <div className="layout-root">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <div className="bg-grid" aria-hidden="true"></div>
      <div className="cursor-glow" aria-hidden="true"></div>

      <nav>
        <div className="container nav-content">
          {isHome ? (
            <a href="#overview" className="nav-brand" onClick={handleNavClick} aria-label="Stasher home">
              <StasherBrand />
            </a>
          ) : (
            <Link to="/" className="nav-brand" aria-label="Stasher home">
              <StasherBrand />
            </Link>
          )}
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
            {navLinks.map((link) => {
              const className = [
                'nav-link',
                isHome && activeSection === link.href ? 'nav-active' : '',
                link.href === '#products' ? 'nav-link--cta' : '',
              ].filter(Boolean).join(' ');

              return isHome ? (
                <a key={link.href} href={link.href} onClick={handleNavClick} className={className}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={`/${link.href}`} className={className}>
                  {link.label}
                </Link>
              );
            })}

            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main id="main-content">{children}</main>

      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <StasherBrand />
              <p className="footer-transmission">{footer.transmission}</p>
            </div>
            <div className="footer-nav" aria-label="Footer navigation">
              {navLinks.slice(0, 4).map((link) => (
                isHome ? (
                  <a key={link.href} href={link.href} onClick={scrollTo}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} to={`/${link.href}`}>
                    {link.label}
                  </Link>
                )
              ))}
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
            {/* Deliberately a div, not <nav>: the global bare `nav` rule is
                the fixed top navbar and would pin these to the viewport. */}
            <div className="footer-legal">
              <Link to="/security">Security</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
