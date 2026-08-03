import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { NavLinkPreview } from '@models/sections';
import { devicePlateClass } from '../deviceImage';

interface NavPreviewLinkProps {
  to: string;
  label: string;
  className: string;
  preview: NavLinkPreview;
  /** Closes the mobile menu when the link is followed. */
  onNavigate: () => void;
}

// Short enough to feel instant, long enough that sweeping the cursor across
// the navbar on the way somewhere else doesn't flash the card open.
const OPEN_DELAY_MS = 90;
// Covers the gap between the trigger and the card, so the pointer can travel
// into the card without it closing underneath.
const CLOSE_DELAY_MS = 160;

/** True on devices with a real hovering pointer. */
const useHoverCapable = (): boolean => {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCapable(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return capable;
};

/**
 * Nav link that reveals a product card on hover or keyboard focus. Touch
 * devices never open it — there the link simply navigates, which is also the
 * server-rendered state, so the card costs nothing until a pointer exists.
 */
export const NavPreviewLink: React.FC<NavPreviewLinkProps> = ({
  to,
  label,
  className,
  preview,
  onNavigate,
}) => {
  const hoverCapable = useHoverCapable();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const clearTimer = () => {
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    timer.current = undefined;
  };

  const schedule = (next: boolean, delay: number) => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpen(next), delay);
  };

  const close = useCallback(() => {
    clearTimer();
    setOpen(false);
  }, []);

  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    // A tap or click anywhere else dismisses the card, including on hybrid
    // laptops where a hover opened it and a touch is used to move on.
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open, close]);

  const handleFollow = () => {
    close();
    onNavigate();
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  };

  if (!hoverCapable) {
    return (
      <Link to={to} className={className} onClick={onNavigate}>
        {label}
      </Link>
    );
  }

  return (
    <div
      className="nav-preview-wrap"
      ref={wrapperRef}
      onMouseEnter={() => schedule(true, OPEN_DELAY_MS)}
      onMouseLeave={() => schedule(false, CLOSE_DELAY_MS)}
      onBlur={handleBlur}
    >
      <Link
        to={to}
        className={className}
        onClick={handleFollow}
        onFocus={() => schedule(true, 0)}
        aria-expanded={open}
      >
        {label}
      </Link>

      <div className={`nav-preview ${open ? 'nav-preview--open' : ''}`} aria-hidden={!open}>
        <Link
          to={to}
          className="nav-preview-card"
          onClick={handleFollow}
          /* Untabbable while hidden: a closed card must not swallow a Tab. */
          tabIndex={open ? 0 : -1}
        >
          <span className={devicePlateClass('nav-preview-figure')}>
            <img
              src={preview.image}
              alt=""
              className="nav-preview-img"
              width={220}
              height={260}
              loading="lazy"
              decoding="async"
            />
          </span>
          <span className="nav-preview-body">
            <span className="nav-preview-kicker">{preview.kicker}</span>
            <span className="nav-preview-title">{preview.title}</span>
            <span className="nav-preview-desc">{preview.description}</span>
            <span className="nav-preview-points">
              {preview.points.map((point) => (
                <span key={point} className="nav-preview-point">{point}</span>
              ))}
            </span>
            <span className="nav-preview-cta">
              {preview.cta}
              <span aria-hidden="true">→</span>
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};
