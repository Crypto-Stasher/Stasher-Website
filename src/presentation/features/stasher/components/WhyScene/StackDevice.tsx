import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import { createStackScreenTexture } from './stackScreenTexture';

const MODEL_URL = `${import.meta.env.BASE_URL}models/stasher-v0.8.stl`;

interface StackDeviceProps {
  accent: string;
}

/**
 * 04 — A full financial stack.
 *
 * The real device, held near face-on so its screen is readable, running a
 * three-beat loop: swap, stake, grow. Each beat is proposed, confirmed with a
 * press, and only then resolves — which is the half of the copy that matters
 * ("every move signed on hardware you're holding").
 *
 * Shares the printable STL with the hero, so the loader cache serves both and
 * this costs no extra download.
 */
export const StackDevice: React.FC<StackDeviceProps> = ({ accent }) => {
  const group = useRef<THREE.Group>(null);
  const sourceGeometry = useLoader(STLLoader, MODEL_URL);
  const screen = useMemo(() => createStackScreenTexture(), []);

  const geometry = useMemo(() => {
    const prepared = toCreasedNormals(sourceGeometry.clone(), Math.PI / 6);
    prepared.computeBoundingBox();
    const center = new THREE.Vector3();
    prepared.boundingBox?.getCenter(center);
    prepared.translate(-center.x, -center.y, -center.z);
    prepared.computeBoundingSphere();
    return prepared;
  }, [sourceGeometry]);

  useEffect(
    () => () => {
      geometry.dispose();
      screen.dispose();
    },
    [geometry, screen],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    screen.update(t);

    if (!group.current) return;
    // A narrow sway, not a spin: the screen has to stay readable throughout.
    group.current.rotation.y = Math.sin(t * 0.22) * 0.2;
    group.current.rotation.x = -0.06 + Math.sin(t * 0.17) * 0.04;
  });

  return (
    // The STL is in millimetres; scale it into the stage's units. Sized so the
    // whole device sits inside its half of the stage rather than overflowing it.
    <group ref={group} scale={0.055}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#141614"
          metalness={0.5}
          roughness={0.46}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          envMapIntensity={0.7}
        />
      </mesh>

      {/* Measured screen floor, matching the hero's placement. */}
      <mesh position={[0, 9.8, 2.515]} renderOrder={2}>
        <planeGeometry args={[24.5, 13.76]} />
        <meshBasicMaterial
          map={screen.texture}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>

      {/* A cool rim to lift the dark shell off the background. Deliberately
          white-ish and weak: a strong accent-coloured lamp this close washes
          the whole shell green and swamps the screen. */}
      <pointLight position={[34, 24, 46]} intensity={150} distance={190} color="#eef4f1" />
      <pointLight position={[-30, -12, 30]} intensity={26} distance={150} color={accent} />
    </group>
  );
};
