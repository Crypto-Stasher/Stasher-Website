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
      <div className="container hero-layout">
        <div className="hero-content reveal-left">
          <span className="tech-tag">{content.tag}</span>
          <h1 style={{ position: 'relative' }}>
            <span style={{ visibility: 'hidden' }}>{content.title}</span>
            <span style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}>{scrambledTitle}</span>
          </h1>
          <p className="hero-desc">{content.description}</p>
          <div className="hero-cta-row">
            <button className="cta-button">{content.cta}</button>
            <div className="hero-network-stat">
              <div className="node-label">NETWORK LOAD</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>{content.networkLoad}</div>
            </div>
          </div>
        </div>
        <div className="hero-image reveal-right">
          <Radar />
          <img
            src={stasherHero}
            alt="Stasher Hardware Wallet — air-gapped cold storage device"
            className="hero-device-img"
            width={540}
            height={540}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
