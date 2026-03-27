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
          <div className="node-label">{footer.transmission}</div>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};
