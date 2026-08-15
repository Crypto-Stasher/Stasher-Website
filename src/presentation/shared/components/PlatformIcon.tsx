import React from 'react';

export type Platform = 'windows' | 'linux';

/** Tux's beak and feet. Fixed rather than themed: it is part of the logo. */
const TUX_AMBER = '#f2a63b';

interface PlatformIconProps {
  platform: Platform;
}

/**
 * Inline platform marks for the download buttons.
 *
 * Hand-drawn rather than pulled from an icon package: the only icon dependency
 * in the project is `cryptocurrency-icons`, and adding a whole brand-icon set
 * for two glyphs is not worth the bytes. Both are solid `currentColor` shapes
 * so they inherit the button's colour in either theme.
 */
export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  if (platform === 'windows') {
    return (
      <svg
        className="platform-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        {/* Four panes, the modern Windows mark. */}
        <path d="M3 4.6 10.9 3.5v8.1H3zM12.4 3.3 22 2v9.6h-9.6zM3 13.1h7.9v8.1L3 20.1zM12.4 13.1H22V22l-9.6-1.3z" />
      </svg>
    );
  }

  return (
    <svg
      className="platform-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* Painted back to front: feet and flippers stick out past the body, then
          the body, then the head on top. The feet have to be wider apart than
          the body so they read as feet rather than disappearing into it.
          Beak and feet are amber rather than currentColor — that two-tone is
          what makes the shape read as Tux instead of a generic blob, and it
          holds up at button size where the finer detail is lost. */}
      <ellipse cx="7.6" cy="21.3" rx="3.2" ry="1.5" fill={TUX_AMBER} />
      <ellipse cx="16.4" cy="21.3" rx="3.2" ry="1.5" fill={TUX_AMBER} />
      <ellipse cx="5.9" cy="14.2" rx="1.5" ry="3.9" transform="rotate(14 5.9 14.2)" />
      <ellipse cx="18.1" cy="14.2" rx="1.5" ry="3.9" transform="rotate(-14 18.1 14.2)" />
      <ellipse cx="12" cy="14.4" rx="5.7" ry="6.4" />
      {/* Head, with the eyes as subpaths knocked out by the even-odd fill rule
          so the mark needs no background-matched shapes. */}
      <path
        fillRule="evenodd"
        d="M12 2.4a3.8 3.8 0 1 0 .01 0ZM10.4 4.9a.78.78 0 1 0 .01 0ZM13.6 4.9a.78.78 0 1 0 .01 0Z"
      />
      <ellipse cx="12" cy="8.5" rx="2" ry="1.15" fill={TUX_AMBER} />
    </svg>
  );
};
