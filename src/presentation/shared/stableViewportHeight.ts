/**
 * Viewport height that does NOT change while the mobile URL bar shows/hides.
 *
 * `window.innerHeight` tracks the *visual* viewport, so it grows and shrinks
 * as the browser chrome animates during a scroll. The hero's scroll-driven
 * animation divides by this value, so a mid-scroll change made the computed
 * progress jump and the model visibly jitter on phones.
 *
 * `document.documentElement.clientHeight` is the *layout* viewport, which
 * stays constant through that animation — a stable divisor, so progress
 * advances smoothly.
 */
export const getStableViewportHeight = (): number =>
  document.documentElement.clientHeight || window.innerHeight || 1;
