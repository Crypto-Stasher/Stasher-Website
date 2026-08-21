import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ada from 'cryptocurrency-icons/svg/color/ada.svg';
import atom from 'cryptocurrency-icons/svg/color/atom.svg';
import avax from 'cryptocurrency-icons/svg/color/avax.svg';
import bnb from 'cryptocurrency-icons/svg/color/bnb.svg';
import btc from 'cryptocurrency-icons/svg/color/btc.svg';
import doge from 'cryptocurrency-icons/svg/color/doge.svg';
import dot from 'cryptocurrency-icons/svg/color/dot.svg';
import eth from 'cryptocurrency-icons/svg/color/eth.svg';
import link from 'cryptocurrency-icons/svg/color/link.svg';
import ltc from 'cryptocurrency-icons/svg/color/ltc.svg';
import sol from 'cryptocurrency-icons/svg/color/sol.svg';
import trx from 'cryptocurrency-icons/svg/color/trx.svg';
import usdt from 'cryptocurrency-icons/svg/color/usdt.svg';
import xmr from 'cryptocurrency-icons/svg/color/xmr.svg';
import xrp from 'cryptocurrency-icons/svg/color/xrp.svg';
import { createCoinTexture } from '../FloatingCoins/coinTexture';

/**
 * Where the stage puts each object, and how far it shrinks it. Exported so the
 * coin field can work out which part of the screen it is allowed to fill —
 * it wraps against the visible trapezoid, not against numbers of its own.
 */
export const STAGE_OFFSET_X = 2.3;
export const STAGE_OFFSET_Y = -0.15;
export const STAGE_SCALE = 0.62;

/** Lean of the stage's split rule: `transform: rotate(4deg)` in the CSS. */
const SPLIT_LEAN = Math.tan((4 * Math.PI) / 180);

/**
 * How far past the page edge the outer walls sit, in world units. The wrap is
 * a jump, and a jump is far less noticeable if it happens just out of frame.
 */
const WALL_MARGIN = 0.7;
/**
 * The inner wall is held this far clear of the split rule instead. It cannot
 * go the other way — the copy is immediately behind it — and the stage's slow
 * camera drift would otherwise carry the odd coin across the line.
 */
const SPLIT_CLEARANCE = 0.35;

interface ObjectProps {
  /** Accent colours resolved from the active theme. */
  accent: string;
  secondary: string;
  surface: string;
  /** What the far tokens fade into. */
  background: string;
  /** Which half of the stage this object sits on: 1 right, -1 left. */
  side: number;
}

/** Minted-edge colour per logo, sampled from the coin's own brand. */
const COIN_LOGOS: { logo: string; edge: string }[] = [
  { logo: btc, edge: '#e9a03c' },
  { logo: eth, edge: '#8f9fd4' },
  { logo: sol, edge: '#9d7bd8' },
  { logo: xrp, edge: '#9aa4ab' },
  { logo: ada, edge: '#6f9bd1' },
  { logo: dot, edge: '#d97ba8' },
  { logo: ltc, edge: '#a8b0b8' },
  { logo: xmr, edge: '#e08a4c' },
  { logo: trx, edge: '#cf5a5a' },
  { logo: bnb, edge: '#e5bb52' },
  { logo: doge, edge: '#cbb46a' },
  { logo: usdt, edge: '#4fa88a' },
  { logo: link, edge: '#5f8ae0' },
  { logo: avax, edge: '#dd6a68' },
  { logo: atom, edge: '#7f86b8' },
];

/**
 * Few enough that each coin is large enough to read its logo, many enough that
 * the pile still reads as "thousands of them" rather than a countable set.
 */
const COIN_COUNT = 150;
/** How far back the field runs; the far end is swallowed by the depth fade. */
const FIELD_DEPTH = 9;

/**
 * Clumps the coins gather around, in the panel's own 0..1 coordinates. Uneven
 * on purpose: an even scatter looks like a lattice however random the offsets
 * are, because the density is the same everywhere you look.
 */
const CLUMPS: { u: number; v: number; z: number; spread: number; pull: number }[] = [
  { u: 0.34, v: 0.68, z: -1.1, spread: 0.3, pull: 0.3 },
  { u: 0.68, v: 0.42, z: -2.4, spread: 0.34, pull: 0.24 },
  { u: 0.5, v: 0.16, z: -0.7, spread: 0.26, pull: 0.16 },
  { u: 0.55, v: 0.88, z: -4.2, spread: 0.4, pull: 0.12 },
];

type CoinSeed = {
  logoIndex: number;
  /**
   * Position across the panel, 0..1 on each axis, mutated in place every frame.
   * Fractions rather than world units because the panel it has to stay inside
   * is the *screen* trapezoid, whose world size changes with the viewport and
   * with how far back the coin sits.
   */
  u: number;
  v: number;
  z: number;
  /** Panel-fractions per second — its own heading, unlike every other coin. */
  du: number;
  dv: number;
  /** Starting orientation — every coin faces its own way. */
  tilt: THREE.Euler;
  /** Radians per second about each axis, signed so they tumble both ways. */
  tumble: THREE.Vector3;
  /** Size multiplier on top of the depth-derived scale. */
  size: number;
  bob: number;
  drift: number;
};

/**
 * Seeded rather than Math.random so the field is identical on the server and
 * the client — a different layout on each would flash on hydration.
 */
const createCoinField = (): CoinSeed[] => {
  let seed = 4_071;
  const random = () => {
    seed = (seed * 16_807) % 2_147_483_647;
    return (seed - 1) / 2_147_483_646;
  };

  // Sum of three draws instead of one: a coin is far likelier to land near a
  // clump's centre than at its rim, which is what makes the field look poured
  // rather than placed.
  const bell = () => (random() + random() + random()) / 3 - 0.5;

  return Array.from({ length: COIN_COUNT }, () => {
    let u = random();
    let v = random();
    let z = -random() * FIELD_DEPTH;

    // Most coins start dragged toward a clump; the rest stay loose, so the
    // field has stragglers between the dense parts. They all drift apart from
    // here anyway — the clumps only decide how it looks on arrival.
    const roll = random();
    let carried = 0;
    const clump = CLUMPS.find((candidate) => {
      carried += candidate.pull;
      return roll < carried;
    });

    if (clump) {
      u = clump.u + bell() * clump.spread * 2;
      v = clump.v + bell() * clump.spread * 2;
      z = Math.max(-FIELD_DEPTH, Math.min(0, clump.z + bell() * 2.4));
    }

    // Heading is a direction and a speed drawn separately, so the field holds
    // both coins that barely move and coins crossing it in half a minute —
    // one shared speed reads as a current carrying everything along.
    const heading = random() * Math.PI * 2;
    const speed = 0.006 + random() * random() * 0.05;

    return {
      logoIndex: Math.floor(random() * COIN_LOGOS.length) % COIN_LOGOS.length,
      u: ((u % 1) + 1) % 1,
      v: ((v % 1) + 1) % 1,
      z,
      du: Math.cos(heading) * speed,
      // Squashed: the panel is much taller than it is wide, so equal fractions
      // per second would read as everything falling rather than milling about.
      dv: Math.sin(heading) * speed * 0.55,
      tilt: new THREE.Euler(
        random() * Math.PI * 2,
        random() * Math.PI * 2,
        random() * Math.PI * 2,
      ),
      tumble: new THREE.Vector3(
        (random() - 0.5) * 0.34,
        (random() - 0.5) * 0.5,
        (random() - 0.5) * 0.26,
      ),
      // A wide spread of sizes at the same depth is most of what separates a
      // scattered field from a receding grid.
      size: 0.55 + random() * random() * 1.5,
      bob: 0.1 + random() * 0.22,
      drift: random() * Math.PI * 2,
    };
  });
};

/** Rasterises every logo once; null until they are all ready. */
const useCoinTextures = (): THREE.CanvasTexture[] | null => {
  const [textures, setTextures] = useState<THREE.CanvasTexture[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all(COIN_LOGOS.map((coin) => createCoinTexture(coin.logo)))
      .then((loaded) => {
        if (cancelled) {
          loaded.forEach((texture) => texture.dispose());
          return;
        }
        setTextures(loaded);
      })
      .catch(() => {
        // A missing logo shouldn't take the slide down — it simply stays empty.
        if (!cancelled) setTextures(null);
      });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => () => textures?.forEach((texture) => texture.dispose()), [textures]);

  return textures;
};

interface CoinBatchProps {
  seeds: CoinSeed[];
  texture: THREE.CanvasTexture;
  edge: string;
  background: string;
  side: number;
  /** Shared scratch object — one per field, not one per batch per frame. */
  dummy: THREE.Object3D;
}

/**
 * Every coin carrying one logo, drawn in a single call.
 *
 * Instancing is per logo rather than per field because an instanced mesh takes
 * one material set: fifteen draw calls for fifteen logos, against 150 if each
 * coin were its own mesh.
 */
const CoinBatch: React.FC<CoinBatchProps> = ({
  seeds,
  texture,
  edge,
  background,
  side,
  dummy,
}) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const viewport = useThree((state) => state.viewport);

  // Depth fade, baked once: each coin is mixed toward the page background by
  // how far back it sits, so the field dissolves instead of ending on a wall.
  // Per-instance colour rather than scene fog — fog would tint every other
  // object in the shared canvas too.
  useEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;

    const far = new THREE.Color(background);
    const lit = new THREE.Color('#ffffff');
    const shade = new THREE.Color();

    seeds.forEach((coin, index) => {
      const depth = 1 - (-coin.z) / FIELD_DEPTH;
      shade.copy(far).lerp(lit, 0.25 + depth * depth * 0.75);
      instanced.setColorAt(index, shade);
    });

    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  }, [seeds, background]);

  useFrame((state, delta) => {
    const instanced = mesh.current;
    if (!instanced) return;

    const t = state.clock.elapsedTime;
    // Capped: a backgrounded tab resumes with a delta of several seconds, and
    // uncapped that teleports the whole field somewhere else at once.
    const step = Math.min(delta, 1 / 30);
    const cameraZ = state.camera.position.z;

    seeds.forEach((coin, index) => {
      // Wrap rather than bounce: a coin that reaches a wall comes back in at
      // the opposite one, keeping its heading. Modulo, not a reset to the far
      // edge, so it re-enters by exactly how far it overshot.
      coin.u = ((coin.u + coin.du * step) % 1 + 1) % 1;
      coin.v = ((coin.v + coin.dv * step) % 1 + 1) % 1;

      // The panel is a screen-space shape, so its world size grows with depth:
      // a coin twice as far away needs twice the world room to cover the same
      // trapezoid. Everything below is worked out at this coin's own depth.
      const worldZ = STAGE_SCALE * coin.z;
      const spread = (cameraZ - worldZ) / cameraZ;
      const halfWidth = (viewport.width / 2 + WALL_MARGIN) * spread;
      const halfHeight = (viewport.height / 2 + WALL_MARGIN) * spread;

      const worldY = -halfHeight + coin.v * halfHeight * 2;
      // The inner wall is the split rule itself, leaning with it — the copy
      // lives on the other side of that line and nothing may cross it. The
      // lean needs no depth correction: both axes scale by `spread`, so the
      // slope survives the conversion out of screen space unchanged.
      const inner = SPLIT_LEAN * worldY + side * SPLIT_CLEARANCE;
      const outer = side * halfWidth;
      const worldX = inner + coin.u * (outer - inner);

      // Nearer coins are larger, which is what sells the depth.
      const depth = 1 - (-coin.z) / FIELD_DEPTH;
      const scale = (0.16 + depth * 0.34) * coin.size;

      dummy.position.set(
        (worldX - STAGE_OFFSET_X * side) / STAGE_SCALE,
        (worldY - STAGE_OFFSET_Y) / STAGE_SCALE + Math.sin(t * 0.28 + coin.drift) * coin.bob,
        coin.z,
      );
      dummy.rotation.set(
        coin.tilt.x + t * coin.tumble.x,
        coin.tilt.y + t * coin.tumble.y,
        coin.tilt.z + t * coin.tumble.z,
      );
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instanced.setMatrixAt(index, dummy.matrix);
    });

    instanced.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, seeds.length]}>
      {/* Enough segments that the rim reads as a milled edge rather than a
          decagon, now that the coins are large enough to inspect. */}
      <cylinderGeometry args={[0.5, 0.5, 0.1, 28]} />
      <meshStandardMaterial attach="material-0" color={edge} metalness={0.85} roughness={0.35} />
      <meshStandardMaterial attach="material-1" map={texture} metalness={0.3} roughness={0.45} />
      <meshStandardMaterial attach="material-2" map={texture} metalness={0.3} roughness={0.45} />
    </instancedMesh>
  );
};

/**
 * 05 — Thousands of coins and tokens.
 *
 * The claim is a quantity, so the object has to feel like a swarm rather than
 * an arrangement: every coin drifts on its own heading at its own speed,
 * tumbling on its own axes, and re-enters at the opposite wall when it leaves
 * the panel. Nothing about the layout repeats, and nothing about it settles.
 *
 * The walls are the visible trapezoid — page edge outside, the leaning split
 * rule inside — so the field fills its half of the stage and never crosses
 * into the copy.
 */
export const CoinsObject: React.FC<ObjectProps> = ({ background, side }) => {
  const textures = useCoinTextures();

  const field = useMemo(() => createCoinField(), []);
  // Grouped up front: the batches are stable for the life of the slide, so the
  // split never runs again on a re-render.
  const batches = useMemo(
    () => COIN_LOGOS.map((_, logoIndex) => field.filter((coin) => coin.logoIndex === logoIndex)),
    [field],
  );

  // Reused every frame; allocating per instance would churn the heap at 60fps.
  const dummy = useMemo(() => new THREE.Object3D(), []);

  if (!textures) return null;

  // No drift on the field as a whole: it used to sway to keep a static layout
  // alive, and now that every coin moves on its own the sway only risks
  // swinging the deep end of the field across the split rule.
  return (
    <group>
      {batches.map((seeds, logoIndex) => (
        seeds.length ? (
          <CoinBatch
            key={logoIndex}
            seeds={seeds}
            texture={textures[logoIndex]}
            edge={COIN_LOGOS[logoIndex].edge}
            background={background}
            side={side}
            dummy={dummy}
          />
        ) : null
      ))}
    </group>
  );
};
