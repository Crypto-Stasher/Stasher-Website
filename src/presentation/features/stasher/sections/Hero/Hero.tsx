import React from 'react';
import stasherHero from '@assets/stasher_hero_image_no_back.png';
import type { HeroContent } from '@models/sections';
import { Radar } from '@features/stasher/components/Radar';
import { StasherScene } from '@features/stasher/components/StasherModel';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    // Tall outer track: the inner hero pins (sticky) while the 3D model spins a full
    // turn, then the page scrolls on. See StasherModel for the scroll->rotation mapping.
    <section className="hero-scroll">
      <div className="hero">
      <div className="container hero-layout">
        <div className="hero-content">
          <span className="tech-tag">{content.tag}</span>
          <h1 className="hero-title-container">{content.title}</h1>
          <p className="hero-desc">{content.description}</p>
          <div className="hero-cta-row">
            <button className="cta-button">{content.cta}</button>
            <div className="hero-network-stat">
              <div className="node-label">Supported chains</div>
              <div className="hero-network-value">56+</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <Radar />
          <StasherScene
            fallbackSrc={stasherHero}
            alt="Stasher Hardware Wallet — air-gapped cold storage device"
          />
        </div>
      </div>
      </div>
    </section>
  );
};
