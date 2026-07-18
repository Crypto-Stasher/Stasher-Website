import React, { useMemo, useState } from 'react';
import { useActiveSection, useCursorGlow, useSmoothScroll } from '@hooks';
import { useAuth } from '../../../application/context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';
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
  const { isAuthenticated, userEmail, logout } = useAuth();

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
          <a href="#overview" className="nav-brand" onClick={handleNavClick} aria-label="Stasher home">
            <StasherBrand />
          </a>
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
                className={[
                  'nav-link',
                  activeSection === link.href ? 'nav-active' : '',
                  link.href === '#products' ? 'nav-link--cta' : '',
                ].filter(Boolean).join(' ')}
              >
                {link.label}
              </a>
            ))}

            {!isAuthenticated ? (
              <Link to="/auth" className="nav-account-link">
                Log in
              </Link>
            ) : (
              <>
                <span className="nav-user">{userEmail?.split('@')[0]}</span>
                <a className="nav-account-link" href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                  Log out
                </a>
              </>
            )}
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
                <a key={link.href} href={link.href} onClick={scrollTo}>
                  {link.label}
                </a>
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
          </div>
        </div>
      </footer>
    </div>
  );
};
