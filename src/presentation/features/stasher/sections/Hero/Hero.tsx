import React from 'react';
import stasherHero from '@assets/stasher_hero_image_no_back.png';
import type { HeroContent } from '@models/sections';
import { useTextScramble } from '@hooks';
import { Radar } from '@features/stasher/components/Radar';

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
          <h1 className="hero-title-container">
            <span className="hero-title-hidden">{content.title}</span>
            <span className="hero-title-scrambled">{scrambledTitle}</span>
          </h1>
          <p className="hero-desc">{content.description}</p>
          <div className="hero-cta-row">
            <button className="cta-button">{content.cta}</button>
            <div className="hero-network-stat">
              <div className="node-label">SUPPORTED CHAINS</div>
              <div className="hero-network-value">56+</div>
            </div>
          </div>
        </div>
        <div className="hero-image reveal-right">
          <Radar />
          <img
            src={stasherHero}
            srcSet={`${stasherHero} 1x, ${stasherHero} 2x`}
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
