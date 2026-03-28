import React from 'react';
import type { StatsContent } from '../../../../../domain/models/sections';

interface StatsProps {
  content: StatsContent;
}

export const Stats: React.FC<StatsProps> = ({ content }) => {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid stagger">
          {content.items.map((item, idx) => (
            <div key={idx} className="stat-item stagger-item">
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
