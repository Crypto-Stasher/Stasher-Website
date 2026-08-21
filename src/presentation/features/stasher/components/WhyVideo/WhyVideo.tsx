import React, { useEffect, useRef } from 'react';

interface WhyVideoProps {
  src: string;
  poster: string;
  /** Half of the stage this occupies; the copy takes the other. */
  side: 'left' | 'right';
  active: boolean;
  reducedMotion: boolean;
  /** Overrides the stage's default fill behind the letterboxed clip. */
  background?: string;
}

/**
 * A looping clip standing in for a generated object on one of the reasons.
 *
 * Plays only while its slide holds the screen — six viewports of decoding for
 * something off screen is wasted battery — and falls back to the poster frame
 * entirely when reduced motion is asked for.
 */
export const WhyVideo: React.FC<WhyVideoProps> = ({
  src,
  poster,
  side,
  active,
  reducedMotion,
  background,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Swapping the source attribute alone leaves the previously decoded frames on
  // screen in some browsers, so the theme swap is followed by an explicit load.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.load();
  }, [reducedMotion, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    if (active) {
      // Autoplay can still be refused (low power mode, for one); the poster
      // stays visible underneath, so there is nothing to handle.
      void video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active, reducedMotion, src]);

  const className = `why-video why-video--${side} ${active ? 'is-active' : ''}`;
  const style = background ? { background } : undefined;

  if (reducedMotion) {
    return (
      <div className={className} style={style} aria-hidden="true">
        <img src={poster} alt="" loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div className={className} style={style} aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
};
