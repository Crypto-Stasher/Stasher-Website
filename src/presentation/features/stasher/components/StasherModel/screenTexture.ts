import * as THREE from 'three';

const SCREEN_WIDTH = 958;
const SCREEN_HEIGHT = 538;
const BOOT_DURATION = 4;
const BOOT_HOLD = 0.65;
const LOGO_FADE_DURATION = 0.8;

const GLYPHS: Record<string, string[]> = {
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  '%': ['11001', '11010', '00100', '00100', '01000', '10110', '00110'],
};

const drawBitmapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  top: number,
) => {
  const pixel = 8;
  const glyphWidth = 5 * pixel;
  const gap = pixel;
  const width = text.length * glyphWidth + Math.max(0, text.length - 1) * gap;
  let x = Math.round(centerX - width / 2);

  ctx.fillStyle = '#ffffff';
  for (const character of text) {
    const glyph = GLYPHS[character];
    if (!glyph) continue;

    glyph.forEach((row, rowIndex) => {
      for (let column = 0; column < row.length; column += 1) {
        if (row[column] === '1') {
          ctx.fillRect(x + column * pixel, top + rowIndex * pixel, pixel, pixel);
        }
      }
    });
    x += glyphWidth + gap;
  }
};

const drawFirmwareFallback = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 64px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FIRMWARE UPDATE', SCREEN_WIDTH / 2, 260);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.strokeRect(79, 311, 800, 48);
  ctx.textAlign = 'left';
};

export interface BootScreenController {
  texture: THREE.CanvasTexture;
  update: (elapsedTime: number) => void;
  dispose: () => void;
}

/**
 * Builds the device display from the two supplied firmware screenshots.
 *
 * The project-local copies are the exact inner 958×538 rectangles from the
 * supplied screenshots, so the red capture perimeter is removed without
 * resampling the black-and-white pixel art.
 */
export const createBootScreenTexture = (): BootScreenController => {
  const canvas = document.createElement('canvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Unable to create the Stasher screen canvas.');

  ctx.imageSmoothingEnabled = false;
  drawFirmwareFallback(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  const base = import.meta.env.BASE_URL;
  const firmwareImage = new Image();
  const homeImage = new Image();
  let firmwareReady = false;
  let homeReady = false;
  let startedAt: number | null = null;
  let lastPercent = -1;
  let lastFadeStep = -1;
  let complete = false;
  let disposed = false;

  const drawSource = (image: HTMLImageElement) => {
    ctx.drawImage(image, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  };

  const drawProgress = (percent: number) => {
    if (firmwareReady) {
      drawSource(firmwareImage);
    } else {
      drawFirmwareFallback(ctx);
    }

    // Remove the 65% fill and percentage baked into the reference frame.
    ctx.fillStyle = '#000000';
    ctx.fillRect(83, 315, 792, 40);
    ctx.fillRect(366, 389, 226, 78);

    // Keep the same four-pixel inset and 32-pixel-high fill as the device UI.
    const fillWidth = Math.round(784 * (percent / 100));
    if (fillWidth > 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(87, 319, fillWidth, 32);
    }

    drawBitmapText(ctx, `${percent}%`, SCREEN_WIDTH / 2, 399);
  };

  const drawLogoFade = (alpha: number) => {
    drawProgress(100);
    if (!homeReady) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    drawSource(homeImage);
    ctx.restore();
  };

  firmwareImage.onload = () => {
    if (disposed) return;
    firmwareReady = true;
    drawProgress(Math.max(0, lastPercent));
    texture.needsUpdate = true;
  };
  homeImage.onload = () => {
    if (disposed) return;
    homeReady = true;
    if (complete) {
      drawSource(homeImage);
      texture.needsUpdate = true;
    }
  };
  firmwareImage.src = `${base}screens/stasher-firmware-progress.png`;
  homeImage.src = `${base}screens/stasher-home.png`;

  return {
    texture,
    update: (elapsedTime: number) => {
      if (complete) return;

      // Start at a real, visible 0% only after both source frames are ready.
      // Otherwise a cold network/cache load can consume the sequence off-screen.
      if (!firmwareReady || !homeReady) {
        if (lastPercent !== 0) {
          lastPercent = 0;
          drawProgress(0);
          texture.needsUpdate = true;
        }
        return;
      }

      if (startedAt === null) startedAt = elapsedTime;
      const time = elapsedTime - startedAt;
      const percent = Math.min(100, Math.floor((time / BOOT_DURATION) * 100));

      if (time <= BOOT_DURATION + BOOT_HOLD) {
        if (percent !== lastPercent) {
          lastPercent = percent;
          drawProgress(percent);
          texture.needsUpdate = true;
        }
        return;
      }

      const alpha = THREE.MathUtils.clamp(
        (time - BOOT_DURATION - BOOT_HOLD) / LOGO_FADE_DURATION,
        0,
        1,
      );

      if (alpha >= 1 && homeReady) {
        drawSource(homeImage);
        texture.needsUpdate = true;
        complete = true;
        return;
      }

      const fadeStep = Math.round(alpha * 30);
      if (fadeStep !== lastFadeStep) {
        lastFadeStep = fadeStep;
        drawLogoFade(alpha);
        texture.needsUpdate = true;
      }
    },
    dispose: () => {
      disposed = true;
      firmwareImage.onload = null;
      homeImage.onload = null;
      texture.dispose();
    },
  };
};
