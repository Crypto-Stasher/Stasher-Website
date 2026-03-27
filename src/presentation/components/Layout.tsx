import React from 'react';
import { useCursorGlow } from '../../application/hooks/useCursorGlow';
import { SITE_CONTENT } from '../../domain/constants';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const mousePos = useCursorGlow();

  return (
    <div className="layout-root">
      <div className="bg-grid"></div>
      <div className="scanline"></div>
      <div 
        className="cursor-glow" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      <nav>
        <div className="container nav-content">
          <div className="logo">
            STASHER<span className="tech-tag" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>V2.1</span>
          </div>
          <div className="nav-links">
            <a href="#differentiators">SYS_INFO</a>
            <a href="#compliance">COMPLIANCE</a>
            <a href="#assets">DEPLOYMENT</a>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer>
        <div className="container">
          <div className="node-label">{SITE_CONTENT.footer.transmission}</div>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{SITE_CONTENT.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};
