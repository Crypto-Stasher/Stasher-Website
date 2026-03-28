import React from 'react';

export const Divider: React.FC<{ variant?: 'line' | 'glow' | 'dots' }> = ({ variant = 'line' }) => {
  if (variant === 'dots') {
    return (
      <div className="divider-dots divider-animated">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    );
  }
  return <div className={`divider-animated ${variant === 'glow' ? 'divider-glow' : ''}`} />;
};
