import React from 'react';
import { useCursorGlow } from '../../../application/hooks/useCursorGlow';
import { HUD } from './HUD';
import type { FooterContent } from '../../../domain/models/Content';

interface LayoutProps {
  children: React.ReactNode;
  footer: FooterContent;
  navLinks: { href: string; label: string }[];
}

export const Layout: React.FC<LayoutProps> = ({ children, footer, navLinks }) => {
  const mousePos = useCursorGlow();

  return (
    <div className="layout-root">
      <div className="bg-grid"></div>
      <div className="scanline"></div>
      <div
        className="cursor-glow"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      <HUD />

      <nav>
        <div className="container nav-content">
          <div className="logo">
            STASHER<span className="tech-tag" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>V2.1</span>
          </div>
          <div className="nav-links">
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <main>{children}</main>

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
