import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { createScreenTexture } from './screenTexture';

/**
 * Procedural 3D model of the Stasher hardware wallet.
 * Animation is driven entirely by page scroll position:
 *   - scrolling down advances rotation + an exploded view
 *   - scrolling up reverses it
 * Motion is damped each frame so it stays smooth and synced to scroll.
 */
export const StasherModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const screen = useRef<THREE.Group>(null);
  const buttons = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);

  // Smoothed scroll progress (0 at top of page, 1 once the hero is scrolled past).
  const progress = useRef(0);

  const screenTex = useMemo(() => createScreenTexture(), []);
  useEffect(() => () => screenTex.dispose(), [screenTex]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30); // guard against tab-switch jumps
    const t = state.clock.elapsedTime;

    const range = window.innerHeight * 1.1;
    const target = THREE.MathUtils.clamp(window.scrollY / range, 0, 1);
    progress.current = THREE.MathUtils.damp(progress.current, target, 6, dt);
    const p = progress.current;

    if (group.current) {
      group.current.rotation.y = p * Math.PI * 2 + t * 0.16;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.08 + p * 0.28, 6, dt);
    }

    // Exploded view: layers separate as you scroll down.
    if (screen.current) screen.current.position.z = 0.1 + p * 0.5;
    if (buttons.current) {
      buttons.current.position.z = 0.08 + p * 0.3;
      buttons.current.position.y = -0.82 - p * 0.25;
    }
    if (body.current) body.current.position.z = -p * 0.12;
  });

  return (
    <group ref={group} scale={1.05} rotation={[-0.08, 0.45, 0]}>
      {/* Body — sleeker, thinner brushed-metal device */}
      <RoundedBox ref={body} args={[1.55, 2.5, 0.16]} radius={0.18} smoothness={10} castShadow>
        <meshPhysicalMaterial
          color="#2b333d"
          metalness={1}
          roughness={0.28}
          clearcoat={0.5}
          clearcoatRoughness={0.4}
          envMapIntensity={1.3}
        />
      </RoundedBox>

      {/* Screen group — UI texture on a slightly raised glass face */}
      <group ref={screen} position={[0, 0.28, 0.1]}>
        {/* Black bezel behind the screen */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.3, 1.62]} />
          <meshStandardMaterial color="#05080b" metalness={0.6} roughness={0.6} />
        </mesh>
        {/* The screen itself */}
        <mesh>
          <planeGeometry args={[1.16, 1.46]} />
          <meshPhysicalMaterial
            map={screenTex}
            emissiveMap={screenTex}
            emissive="#ffffff"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </group>

      {/* Two rounded-rectangle buttons below the screen */}
      <group ref={buttons} position={[0, -0.82, 0.08]}>
        {[-0.34, 0.34].map((x) => (
          <RoundedBox key={x} args={[0.56, 0.26, 0.07]} radius={0.1} smoothness={6} position={[x, 0, 0]} castShadow>
            <meshStandardMaterial color="#141a21" metalness={0.85} roughness={0.35} envMapIntensity={1.2} />
          </RoundedBox>
        ))}
      </group>

      {/* USB-C port at the bottom edge */}
      <mesh position={[0, -1.27, 0]}>
        <boxGeometry args={[0.26, 0.05, 0.1]} />
        <meshStandardMaterial color="#04070a" metalness={0.5} roughness={0.7} />
      </mesh>
    </group>
  );
};
