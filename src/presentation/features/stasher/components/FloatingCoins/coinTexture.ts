import * as THREE from 'three';

/**
 * Rasterise a coin logo SVG onto a canvas texture for the coin faces.
 *
 * The `cryptocurrency-icons` sources are 32px SVGs — handing the URL straight
 * to TextureLoader would rasterise at that intrinsic size and look mushy on a
 * large face. Drawing to a 256px canvas keeps it crisp, and lets us lay the
 * logo over a minted disc face rather than a transparent square.
 */
export const createCoinTexture = (
  url: string,
  size = 256,
): Promise<THREE.CanvasTexture> => new Promise((resolve, reject) => {
  const image = new Image();

  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('2d canvas context unavailable'));
      return;
    }

    // Minted face: a pale disc so the logo reads against the metal edge.
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#fbfaf6');
    gradient.addColorStop(1, '#d8d5cb');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    const padding = size * 0.22;
    ctx.drawImage(image, padding, padding, size - padding * 2, size - padding * 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    resolve(texture);
  };

  image.onerror = () => reject(new Error(`coin logo failed to load: ${url}`));
  image.src = url;
});
