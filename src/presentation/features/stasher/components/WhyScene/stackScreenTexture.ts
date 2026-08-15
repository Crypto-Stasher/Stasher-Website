import * as THREE from 'three';

/** Matches the device's screen recess aspect (24.5 x 13.76 mm). */
const WIDTH = 958;
const HEIGHT = 538;

/** Seconds per action, including its confirm press. */
const BEAT = 4;
const BEATS = 3;
const CYCLE = BEAT * BEATS;

/** Where each phase sits inside a beat. */
const PROMPT_END = 1.5;
const CONFIRM_END = 2.2;
const RESOLVE_END = 3.5;

const MINT = '#b8ffe3';
const LAVENDER = '#d2baff';
const DIM = '#3f4a45';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (x: number) => x * x * (3 - 2 * x);

/** Progress through a phase, 0 outside it. */
const phase = (t: number, from: number, to: number) => clamp01((t - from) / (to - from));

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
};

/** Swap: two tokens trade places along a shallow arc. */
const drawSwap = (ctx: CanvasRenderingContext2D, resolve: number) => {
  const travel = ease(resolve);
  const left = 300;
  const right = 658;
  const y = 250;
  const lift = Math.sin(travel * Math.PI) * 52;

  const pairs = [
    { colour: MINT, x: left + (right - left) * travel, y: y - lift },
    { colour: LAVENDER, x: right - (right - left) * travel, y: y + lift },
  ];

  ctx.lineWidth = 5;
  pairs.forEach((token) => {
    ctx.fillStyle = token.colour;
    ctx.beginPath();
    ctx.arc(token.x, token.y, 34, 0, Math.PI * 2);
    ctx.fill();
  });
};

/** Stake: a token locks in place and a ring closes around it. */
const drawStake = (ctx: CanvasRenderingContext2D, resolve: number) => {
  const centerX = WIDTH / 2;
  const centerY = 250;
  const settle = ease(clamp01(resolve * 2));
  const ring = ease(clamp01((resolve - 0.35) / 0.65));

  ctx.fillStyle = MINT;
  ctx.beginPath();
  ctx.arc(centerX, centerY - (1 - settle) * 60, 34, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = LAVENDER;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 74, -Math.PI / 2, -Math.PI / 2 + ring * Math.PI * 2);
  ctx.stroke();
};

/** Grow: bars rise in sequence, the last one reaching highest. */
const drawGrow = (ctx: CanvasRenderingContext2D, resolve: number) => {
  const heights = [46, 78, 112, 150];
  const baseline = 330;
  const barWidth = 44;
  const gap = 26;
  const totalWidth = heights.length * barWidth + (heights.length - 1) * gap;
  let x = WIDTH / 2 - totalWidth / 2;

  heights.forEach((height, index) => {
    // Each bar waits its turn, so the row builds left to right.
    const grow = ease(clamp01((resolve - index * 0.13) / 0.5));
    const drawn = height * grow;

    ctx.fillStyle = index === heights.length - 1 ? MINT : LAVENDER;
    ctx.globalAlpha = 0.45 + grow * 0.55;
    roundedRect(ctx, x, baseline - drawn, barWidth, drawn, 8);
    ctx.fill();
    ctx.globalAlpha = 1;

    x += barWidth + gap;
  });
};

/** The confirm strip: what the device asks before it signs. */
const drawConfirm = (ctx: CanvasRenderingContext2D, t: number) => {
  const prompt = phase(t, 0.2, PROMPT_END);
  const press = phase(t, PROMPT_END, CONFIRM_END);

  // Outline waits, then fills as the button is held.
  ctx.strokeStyle = press > 0 ? MINT : DIM;
  ctx.lineWidth = 4;
  roundedRect(ctx, 330, 396, 298, 74, 37);
  ctx.globalAlpha = 0.35 + prompt * 0.65;
  ctx.stroke();
  ctx.globalAlpha = 1;

  if (press > 0) {
    ctx.fillStyle = MINT;
    ctx.globalAlpha = ease(press);
    roundedRect(ctx, 330, 396, 298 * ease(press), 74, 37);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // A tick, drawn once the press completes.
  if (press >= 1) {
    ctx.strokeStyle = '#04140e';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(452, 433);
    ctx.lineTo(472, 452);
    ctx.lineTo(508, 414);
    ctx.stroke();
  }
};

export type StackScreen = {
  texture: THREE.CanvasTexture;
  update: (elapsed: number) => void;
  dispose: () => void;
};

/**
 * The device screen for the "full financial stack" slide.
 *
 * Each beat runs the same ritual — the action is proposed, the confirm strip
 * fills as the button is pressed, and only then does the action resolve. That
 * order is the point of the copy: every move is signed on the hardware.
 *
 * Drawn to a canvas rather than composed from sprites so the whole cycle is
 * one deterministic function of the clock, which keeps it loop-safe.
 */
export const createStackScreenTexture = (): StackScreen => {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;

  let lastFrame = -1;

  const update = (elapsed: number) => {
    if (!ctx) return;

    // Repaint at 24fps: the screen is small on stage and this is a canvas
    // upload every frame otherwise.
    const frame = Math.floor(elapsed * 24);
    if (frame === lastFrame) return;
    lastFrame = frame;

    const cycle = elapsed % CYCLE;
    const index = Math.floor(cycle / BEAT);
    const t = cycle % BEAT;

    ctx.fillStyle = '#05100c';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Fades between beats so the swap never happens on a visible cut.
    const fade = Math.min(phase(t, 0, 0.25), 1 - phase(t, RESOLVE_END, BEAT));
    ctx.globalAlpha = fade;

    const resolve = phase(t, CONFIRM_END, RESOLVE_END);
    if (index === 0) drawSwap(ctx, resolve);
    if (index === 1) drawStake(ctx, resolve);
    if (index === 2) drawGrow(ctx, resolve);

    drawConfirm(ctx, t);

    ctx.globalAlpha = 1;
    texture.needsUpdate = true;
  };

  update(0);

  return {
    texture,
    update,
    dispose: () => texture.dispose(),
  };
};
