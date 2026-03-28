import React from 'react';
import type { HowItWorksContent } from '@models/sections';

interface HowItWorksProps {
  content: HowItWorksContent;
}

const ZONE_COLORS: Record<string, string> = {
  hot: 'var(--accent-red)',
  dmz: 'var(--accent-yellow)',
  cold: 'var(--accent-cyan)',
};

export const HowItWorks: React.FC<HowItWorksProps> = ({ content }) => {
  return (
    <section id="how-it-works" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>

        <div className="ceremony-flow stagger">
          {content.steps.map((step) => (
            <div key={step.step} className="ceremony-step stagger-item">
              <div className="ceremony-step-number" style={{ borderColor: ZONE_COLORS[step.zone], color: ZONE_COLORS[step.zone] }}>
                {String(step.step).padStart(2, '0')}
              </div>
              <div className="ceremony-step-content">
                <div className="ceremony-step-label">{step.label}</div>
                <div className="ceremony-zone-tag" style={{ color: ZONE_COLORS[step.zone], borderColor: ZONE_COLORS[step.zone] }}>
                  {step.zone.toUpperCase()}
                </div>
                <p className="ceremony-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
