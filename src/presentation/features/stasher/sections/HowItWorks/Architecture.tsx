import React from 'react';
import type { ArchitectureContent } from '@models/sections';

interface ArchitectureProps {
  content: ArchitectureContent;
}

export const Architecture: React.FC<ArchitectureProps> = ({ content }) => {
  return (
    <section id="architecture" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>
        <p className="section-description reveal">{content.description}</p>

        <div className="arch-zones stagger">
          {content.zones.map((zone) => (
            <div key={zone.zone} className="arch-zone stagger-item">
              <div className="arch-zone-header" style={{ borderColor: zone.color }}>
                <span className="arch-zone-label" style={{ color: zone.color }}>{zone.zone}</span>
              </div>
              <div className="arch-machines">
                {zone.machines.map((machine) => (
                  <div key={machine.name} className="arch-machine">
                    <div className="arch-machine-name" style={{ color: zone.color }}>{machine.name}</div>
                    <div className="arch-machine-role">{machine.role}</div>
                    <div className="arch-machine-detail">{machine.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="arch-flow reveal">
          <div className="arch-flow-line" />
          <div className="arch-flow-labels">
            <span style={{ color: 'var(--accent-cyan)' }}>OFFLINE</span>
            <span style={{ color: 'var(--accent-yellow)' }}>BRIDGE</span>
            <span style={{ color: 'var(--accent-blue)' }}>MOBILE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
