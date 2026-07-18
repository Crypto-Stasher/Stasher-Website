import React from 'react';

interface StasherMarkProps {
  className?: string;
}

/**
 * The hardware's original 27 × 27 pixel mark, kept as hard-edged vector
 * geometry so it remains identical from the favicon up to large displays.
 */
export const StasherMark: React.FC<StasherMarkProps> = ({
  className = 'brand-mark',
}) => (
  <svg
    className={className}
    viewBox="0 0 27 27"
    aria-hidden="true"
    focusable="false"
    shapeRendering="crispEdges"
  >
    <path
      fill="currentColor"
      d="M3 0h21l3 3v4H7v4H0V3L3 0Zm-3 11h27v6H0v-6Zm21 6h6v7l-3 3H3l-3-3v-4h21v-3Z"
    />
  </svg>
);

interface StasherBrandProps {
  compact?: boolean;
}

export const StasherBrand: React.FC<StasherBrandProps> = ({
  compact = false,
}) => (
  <span className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`}>
    <StasherMark />
    <span className="brand-name">STASHER</span>
  </span>
);
