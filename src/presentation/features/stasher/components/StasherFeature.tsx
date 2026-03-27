import React from 'react';
import type { HeroContent, DifferentiatorItem, ComplianceContent, AssetsContent } from '../../../../domain/models/Content';
import { Radar } from './Radar';
import { useTextScramble } from '../../../../application/hooks/useTextScramble';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const scrambledTitle = useTextScramble(content.title);

  return (
    <section className="hero">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
        <div className="hero-content reveal">
          <span className="tech-tag">{content.tag}</span>
          <h1 style={{ minHeight: '1.2em' }}>{scrambledTitle}</h1>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', marginBottom: '3rem' }}>{content.description}</p>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button className="cta-button">{content.cta}</button>
            <div style={{ borderLeft: '1px solid var(--border-neon)', paddingLeft: '1.5rem' }}>
              <div className="node-label">NETWORK LOAD</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>{content.networkLoad}</div>
            </div>
          </div>
        </div>
        <div className="hero-image reveal" style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Radar />
          <img 
            src="/stasher_hero_device.png" 
            alt="Stasher Hardware" 
            style={{ width: '100%', maxWidth: '540px', filter: 'drop-shadow(0 0 60px rgba(0, 242, 254, 0.25))', position: 'relative', zIndex: 1 }} 
          />
        </div>
      </div>
    </section>
  );
};

interface DifferentiatorsProps {
  title: string;
  items: DifferentiatorItem[];
}

export const Differentiators: React.FC<DifferentiatorsProps> = ({ title, items }) => {
  return (
    <section id="differentiators" className="container">
      <p className="section-title">Institutional Core</p>
      <h2 className="reveal" style={{ fontSize: '3rem', textAlign: 'center', fontWeight: 900, marginBottom: '5rem', fontFamily: 'var(--font-mono)' }}>
        {title}
      </h2>
      <div className="features-grid">
        {items.map((item) => (
          <div key={item.id} className="feature-card reveal">
            <div className="glare" />
            <div className="node-label">{item.id} // {item.label}</div>
            <h3>{item.title}</h3>
            <p style={{ color: 'var(--text-dim)', position: 'relative', zIndex: 1 }}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

interface ComplianceProps {
  content: ComplianceContent;
}

export const Compliance: React.FC<ComplianceProps> = ({ content }) => {
  return (
    <section id="compliance" style={{ background: 'rgba(0, 242, 254, 0.01)', borderTop: '1px solid var(--border-neon)', borderBottom: '1px solid var(--border-neon)' }}>
      <div className="container">
        <p className="section-title">Operations & Audit</p>
        <h2 className="reveal" style={{ fontSize: '3rem', textAlign: 'left', fontWeight: 900, marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
          {content.title}
        </h2>
        <p className="reveal" style={{ maxWidth: '700px', color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '4rem' }}>{content.description}</p>
        <div className="compliance-list reveal">
          {content.points.map((point, index) => (
            <div key={index} className="compliance-item">
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface AssetsProps {
  content: AssetsContent;
}

export const Assets: React.FC<AssetsProps> = ({ content }) => {
  return (
    <section id="assets" className="container reveal" style={{ textAlign: 'center' }}>
      <p className="section-title">Asset Deployment</p>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem', fontFamily: 'var(--font-mono)' }}>{content.title}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {content.items.map((asset, index) => (
          <span key={index} className="asset-badge">{asset}</span>
        ))}
      </div>
    </section>
  );
};
