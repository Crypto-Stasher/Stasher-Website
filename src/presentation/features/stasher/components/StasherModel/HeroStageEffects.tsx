import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Theme } from '../../../../../application/context/ThemeContext';

interface HeroStageEffectsProps {
  /** Keeps the visual composition while disabling all ambient motion. */
  reducedMotion: boolean;
  theme: Theme;
}

const PARTICLE_COUNT = 96;
const ADDITIVE = THREE.AdditiveBlending;

const createParticleField = (): Float32Array => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  let seed = 831_947;

  const random = () => {
    seed = (seed * 16_807) % 2_147_483_647;
    return (seed - 1) / 2_147_483_646;
  };

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const offset = index * 3;
    const side = random() > 0.5 ? 1 : -1;

    // Leave breathing room around the product and concentrate depth at the edges.
    positions[offset] = side * (1.45 + random() * 3.2);
    positions[offset + 1] = (random() - 0.5) * 6.2;
    positions[offset + 2] = -3.8 + random() * 5.2;
  }

  return positions;
};

const PacketLight: React.FC<{
  blending: THREE.Blending;
  color: string;
}> = ({ blending, color }) => (
  <group>
    <mesh rotation={[0.6, 0.65, 0.15]}>
      <boxGeometry args={[0.075, 0.075, 0.075]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.95}
        blending={blending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
    <mesh position={[0, -0.09, 0]} scale={0.58}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.38}
        blending={blending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
    <mesh position={[0, -0.16, 0]} scale={0.36}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.18}
        blending={blending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
    <pointLight color={color} intensity={0.7} distance={0.7} decay={2} />
  </group>
);

/**
 * A lightweight ambient-effects rig that gives the hero some spatial depth
 * without adding post-processing or another runtime dependency.
 */
export const HeroStageEffects: React.FC<HeroStageEffectsProps> = ({
  reducedMotion,
  theme,
}) => {
  const root = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);
  const ringOne = useRef<THREE.Mesh>(null);
  const ringTwo = useRef<THREE.Mesh>(null);
  const ringThree = useRef<THREE.Mesh>(null);
  const packetOne = useRef<THREE.Group>(null);
  const packetTwo = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Group>(null);
  const scanMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const scrollProgress = useRef(0);
  const particlePositions = useMemo(() => createParticleField(), []);
  const isLight = theme === 'light';
  const blending = isLight ? THREE.NormalBlending : ADDITIVE;
  const mint = isLight ? '#087454' : '#aefadc';
  const lavender = isLight ? '#69479d' : '#d5c7ff';
  const neutral = isLight ? '#53615a' : '#eefdf6';

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    const dt = Math.min(delta, 1 / 30);
    const scrollTarget = THREE.MathUtils.clamp(
      window.scrollY / Math.max(window.innerHeight * 0.95, 1),
      0,
      1,
    );

    scrollProgress.current = THREE.MathUtils.damp(
      scrollProgress.current,
      scrollTarget,
      4,
      dt,
    );

    if (root.current) {
      root.current.position.y = THREE.MathUtils.damp(
        root.current.position.y,
        -scrollProgress.current * 0.12,
        4,
        dt,
      );
    }

    if (particles.current) {
      particles.current.position.x = THREE.MathUtils.damp(
        particles.current.position.x,
        state.pointer.x * 0.24,
        3,
        dt,
      );
      particles.current.position.y = THREE.MathUtils.damp(
        particles.current.position.y,
        state.pointer.y * 0.16 - scrollProgress.current * 0.1,
        3,
        dt,
      );
      particles.current.rotation.y = elapsed * 0.008 + state.pointer.x * 0.015;
    }

    if (ringOne.current) {
      ringOne.current.rotation.z =
        0.18 + elapsed * 0.035 + scrollProgress.current * 0.9;
    }
    if (ringTwo.current) {
      ringTwo.current.rotation.z =
        -0.65 - elapsed * 0.027 - scrollProgress.current * 0.65;
    }
    if (ringThree.current) {
      ringThree.current.rotation.z =
        1.7 + elapsed * 0.02 + scrollProgress.current * 0.45;
    }

    if (packetOne.current) {
      packetOne.current.rotation.z =
        elapsed * 0.33 + scrollProgress.current * Math.PI * 0.8;
    }
    if (packetTwo.current) {
      packetTwo.current.rotation.z =
        Math.PI + elapsed * -0.24 - scrollProgress.current * Math.PI * 0.55;
    }

    if (scan.current) {
      const scanCycle = (Math.sin(elapsed * 0.62 + scrollProgress.current * Math.PI) + 1) / 2;
      scan.current.position.x = THREE.MathUtils.lerp(-1.5, 1.5, scanCycle);
      if (scanMaterial.current) {
        scanMaterial.current.opacity = 0.025 + Math.sin(scanCycle * Math.PI) * 0.035;
      }
    }
  });

  return (
    <group ref={root}>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={mint}
          size={0.025}
          sizeAttenuation
          transparent
          opacity={isLight ? 0.34 : 0.42}
          blending={blending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      <mesh
        ref={ringOne}
        rotation={[0.96, 0.14, 0.18]}
        scale={[0.9, 1.08, 1]}
      >
        <torusGeometry args={[1.72, 0.008, 6, 144, Math.PI * 2]} />
        <meshBasicMaterial
          color={mint}
          side={THREE.DoubleSide}
          transparent
          opacity={isLight ? 0.28 : 0.19}
          blending={blending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        ref={ringTwo}
        rotation={[-0.48, 0.98, -0.65]}
        scale={[0.84, 1.13, 1]}
      >
        <torusGeometry args={[1.87, 0.006, 6, 144, Math.PI * 2]} />
        <meshBasicMaterial
          color={lavender}
          side={THREE.DoubleSide}
          transparent
          opacity={isLight ? 0.22 : 0.15}
          blending={blending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        ref={ringThree}
        rotation={[0.32, -0.72, 1.7]}
        scale={[0.88, 1.1, 1]}
      >
        <torusGeometry args={[2.02, 0.005, 6, 144, Math.PI * 2]} />
        <meshBasicMaterial
          color={neutral}
          side={THREE.DoubleSide}
          transparent
          opacity={isLight ? 0.17 : 0.1}
          blending={blending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <group ref={packetOne} rotation={[0.96, 0.14, 0]}>
        <group position={[1.72, 0, 0]}>
          <PacketLight blending={blending} color={mint} />
        </group>
      </group>
      <group ref={packetTwo} rotation={[-0.48, 0.98, Math.PI]}>
        <group position={[1.87, 0, 0]}>
          <PacketLight blending={blending} color={lavender} />
        </group>
      </group>

      <group ref={scan} position={[-1.5, 0.02, 0.72]}>
        <mesh renderOrder={3}>
          <planeGeometry args={[0.3, 3.5]} />
          <meshBasicMaterial
            ref={scanMaterial}
            color={mint}
            transparent
            opacity={0.025}
            blending={blending}
            depthWrite={false}
            depthTest={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0.145, 0, 0.002]} renderOrder={4}>
          <planeGeometry args={[0.012, 3.5]} />
          <meshBasicMaterial
            color={mint}
            transparent
            opacity={0.13}
            blending={blending}
            depthWrite={false}
            depthTest={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
};
