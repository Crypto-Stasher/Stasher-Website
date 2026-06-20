import React from 'react';

// Soft concentric glow behind the hero product render. Kept subtle and calm —
// no "radar sweep" or data-stream effects (those read as hacker-cosplay).
export const Radar: React.FC = () => {
  return (
    <div className="radar-container" aria-hidden="true">
      <div className="radar-ring" style={{ width: '300px', height: '300px', animationDelay: '0s' }} />
      <div className="radar-ring" style={{ width: '440px', height: '440px', animationDelay: '1.5s' }} />
    </div>
  );
};
