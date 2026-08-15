import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ObjectProps {
  /** Accent colours resolved from the active theme. */
  accent: string;
  secondary: string;
  surface: string;
}

/** Enough that counting is hopeless, few enough to stay cheap on a phone. */
const COIN_COUNT = 1600;
/** How far back the field runs; the far end is swallowed by the depth fade. */
const FIELD_DEPTH = 11;
/** Page background, for fading the far tokens into it. */
const VOID = new THREE.Color('#050606');

type CoinSeed = {
  x: number;
  y: number;
  z: number;
  tiltX: number;
  tiltZ: number;
  spin: number;
  drift: number;
  warm: boolean;
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

  return Array.from({ length: COIN_COUNT }, () => {
    // Constant width, not widening with depth: perspective already converges
    // the far end, and adding spread on top pushes it out of the object's half
    // of the stage and across the copy.
    const z = -random() * FIELD_DEPTH;
    // Narrower than it is tall: a column fits the trapezoid, where a cube of
    // tokens spills across the split rule and over the copy.
    const spread = 2.3;

    return {
      x: (random() - 0.5) * spread,
      y: (random() - 0.5) * spread * 1.9,
      z,
      tiltX: random() * Math.PI,
      tiltZ: random() * Math.PI,
      spin: 0.15 + random() * 0.5,
      drift: random() * Math.PI * 2,
      warm: random() > 0.5,
    };
  });
};

/**
 * 05 — Thousands of coins and tokens.
 *
 * The claim is a quantity, so the object has to be uncountable: a few thousand
 * tokens receding into depth, the near ones legible and the far ones dissolving
 * into the background. A handful of discs would invite counting and undercut
 * the number.
 *
 * One InstancedMesh rather than N meshes — 2,600 separate draw calls would cost
 * more than the rest of the page put together.
 */
export const CoinsObject: React.FC<ObjectProps> = ({ accent, secondary }) => {
  const group = useRef<THREE.Group>(null);
  const mintMesh = useRef<THREE.InstancedMesh>(null);
  const warmMesh = useRef<THREE.InstancedMesh>(null);

  const field = useMemo(() => createCoinField(), []);
  const cool = useMemo(() => field.filter((coin) => !coin.warm), [field]);
  const warm = useMemo(() => field.filter((coin) => coin.warm), [field]);

  // Depth fade, baked once: each token is mixed toward the page background by
  // how far back it sits, so the field dissolves instead of ending on a wall.
  // Per-instance colour rather than scene fog — fog would tint every other
  // object in the shared canvas too.
  const paint = (mesh: THREE.InstancedMesh | null, coins: CoinSeed[], hex: string) => {
    if (!mesh) return;

    const base = new THREE.Color(hex);
    const shade = new THREE.Color();

    coins.forEach((coin, index) => {
      const depth = 1 - (-coin.z) / FIELD_DEPTH;
      // Steep, so only the nearest tokens carry full colour and the field
      // reads as depth rather than a flat sheet.
      shade.copy(VOID).lerp(base, 0.04 + depth * depth * 0.7);
      mesh.setColorAt(index, shade);
    });

    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  };

  useEffect(() => {
    paint(mintMesh.current, cool, accent);
    paint(warmMesh.current, warm, secondary);
  }, [cool, warm, accent, secondary]);

  // Reused every frame; allocating per instance would churn the heap at 60fps.
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const write = (
    mesh: THREE.InstancedMesh | null,
    coins: CoinSeed[],
    elapsed: number,
  ) => {
    if (!mesh) return;

    coins.forEach((coin, index) => {
      // Nearer discs are larger, which is what sells the depth.
      const depth = 1 - (-coin.z) / FIELD_DEPTH;
      const scale = 0.05 + depth * 0.15;

      dummy.position.set(
        coin.x,
        coin.y + Math.sin(elapsed * 0.28 + coin.drift) * 0.16,
        coin.z,
      );
      dummy.rotation.set(
        coin.tiltX + elapsed * 0.06,
        0,
        coin.tiltZ + elapsed * coin.spin * 0.16,
      );
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (group.current) {
      // Deliberately tiny: the field is deep, so rotation about its centre
      // swings the far end sideways by depth x sin(angle). At 0.28rad over 18
      // units that threw the back of the field five units across the stage and
      // over the copy. Small angles keep the parallax without the sweep.
      group.current.rotation.y = Math.sin(t * 0.06) * 0.05;
      group.current.rotation.x = Math.sin(t * 0.05) * 0.03;
    }

    write(mintMesh.current, cool, t);
    write(warmMesh.current, warm, t);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mintMesh} args={[undefined, undefined, cool.length]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 10]} />
        {/* Unlit: the depth fade is carried entirely by the per-instance
            colour, and 2,200 lit discs would shade for no visible gain. */}
        <meshBasicMaterial />
      </instancedMesh>

      <instancedMesh ref={warmMesh} args={[undefined, undefined, warm.length]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 10]} />
        <meshBasicMaterial />
      </instancedMesh>
    </group>
  );
};
