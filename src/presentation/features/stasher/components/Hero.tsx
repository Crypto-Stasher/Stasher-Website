import React from 'react';
import stasherHero from '../../../../assets/stasher_hero_device.png';
import type { HeroContent } from '../../../../domain/models/sections';
import { useTextScramble } from '../../../../application/hooks/useTextScramble';
import { Radar } from './Radar';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const scrambledTitle = useTextScramble(content.title);

  return (
    <section className="hero">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
        <div className="hero-content reveal-left">
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
        <div className="hero-image reveal-right" style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', minWidth: '300px' }}>
          <Radar />
          <img
            src={stasherHero}
            alt="Stasher Hardware"
            style={{ width: '100%', maxWidth: '540px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.15))' }}
          />
        </div>
      </div>
    </section>
  );
};
