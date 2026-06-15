import * as THREE from 'three';

/**
 * Draws a wallet-style UI onto a canvas and returns it as a texture.
 * Done procedurally (no external fonts/images) so it works offline and in SSR builds.
 */
export const createScreenTexture = (): THREE.CanvasTexture => {
  const w = 512;
  const h = 720;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#05181f');
  bg.addColorStop(1, '#020a0e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Top status bar
  ctx.fillStyle = '#00f2fe';
  ctx.font = 'bold 26px monospace';
  ctx.fillText('STASHER', 36, 56);
  ctx.beginPath();
  ctx.arc(w - 50, 48, 9, 0, Math.PI * 2);
  ctx.fillStyle = '#3ee37a';
  ctx.fill();

  // Total balance
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '22px monospace';
  ctx.fillText('TOTAL BALANCE', 36, 150);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 58px monospace';
  ctx.fillText('$24,580', 36, 210);

  // Coin rows
  const coins: Array<[string, string, string]> = [
    ['BTC', '0.382', '#f7931a'],
    ['ETH', '4.21', '#7b9cff'],
    ['SOL', '128.4', '#00ffa3'],
  ];
  let y = 320;
  coins.forEach(([sym, amt, color]) => {
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(28, y - 34, w - 56, 78);
    ctx.beginPath();
    ctx.arc(70, y + 4, 22, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px monospace';
    ctx.fillText(sym, 110, y + 14);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '28px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(amt, w - 40, y + 14);
    ctx.textAlign = 'left';
    y += 104;
  });

  // Bottom confirm hint
  ctx.fillStyle = '#00f2fe';
  ctx.fillRect(36, h - 76, w - 72, 4);
  ctx.fillStyle = 'rgba(0,242,254,0.85)';
  ctx.font = '22px monospace';
  ctx.fillText('PRESS TO CONFIRM', 110, h - 30);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};
