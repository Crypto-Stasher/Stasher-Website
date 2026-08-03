import deviceImage from '@assets/stasher-model-fallback.png';

/**
 * The device still used on /product and in the nav preview card.
 *
 * TO SWAP IN THE TRANSPARENT RENDER (two lines):
 *   1. drop the file at src/assets/stasher-device.png
 *   2. change the import above to that file, and set the flag below to `true`
 *
 * Nothing else needs touching: the plate behind the image follows the flag and
 * turns light in light mode / dark in dark mode on its own.
 */
export const DEVICE_IMAGE = deviceImage;

/**
 * False while the asset is the studio render, whose black backdrop is baked
 * into the pixels. A light plate behind it would frame a black rectangle, so
 * the `--opaque` modifier keeps the plate dark in both themes until the
 * transparent version lands.
 */
export const DEVICE_IMAGE_HAS_ALPHA = false;

/** Adds the `--opaque` modifier while the image still carries its own backdrop. */
export const devicePlateClass = (base: string): string =>
  DEVICE_IMAGE_HAS_ALPHA ? base : `${base} ${base}--opaque`;
