import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import { createBootScreenTexture } from './screenTexture';
import { getStableViewportHeight } from '../../../../shared/stableViewportHeight';

const MODEL_URL = `${import.meta.env.BASE_URL}models/stasher-v0.8.stl`;

interface StasherModelProps {
  reducedMotion?: boolean;
}

/**
 * The actual printable Stasher shell.
 *
 * The STL is a single watertight mesh, so the display is mounted as a separate
 * plane at the measured floor of the screen recess. Dimensions remain in the
 * STL's original millimetres and are normalized by the outer group.
 */
export const StasherModel: React.FC<StasherModelProps> = ({
  reducedMotion = false,
}) => {
  const group = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);
  const sourceGeometry = useLoader(STLLoader, MODEL_URL);
  const bootScreen = useMemo(() => createBootScreenTexture(), []);

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
      bootScreen.dispose();
    },
    [bootScreen, geometry],
  );

  useFrame((state, delta) => {
    bootScreen.update(state.clock.elapsedTime);

    if (!group.current) return;
    const dt = Math.min(delta, 1 / 30);
    if (reducedMotion) {
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        -0.04,
        4,
        dt,
      );
      return;
    }

    const scrollTarget = THREE.MathUtils.clamp(
      window.scrollY / Math.max(getStableViewportHeight() * 0.9, 1),
      0,
      1,
    );
    scrollProgress.current = THREE.MathUtils.damp(
      scrollProgress.current,
      scrollTarget,
      5,
      dt,
    );

    // Keep the original pinned-scroll choreography, now as a complete turn.
    // TrackballControls owns free drag-orbit rotation and never snaps it back.
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.22 + scrollProgress.current * Math.PI * 2,
      6,
      dt,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      -0.04 + Math.sin(state.clock.elapsedTime * 0.7) * 0.025,
      4,
      dt,
    );
  });

  return (
    <group ref={group} scale={0.05} rotation={[0.035, -0.22, -0.025]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#191a19"
          metalness={0.38}
          roughness={0.32}
          clearcoat={0.58}
          clearcoatRoughness={0.22}
          envMapIntensity={2.1}
        />
      </mesh>

      {/* Measured screen floor after centring the 0–9 mm Z bounds. */}
      <mesh position={[0, 9.8, 2.515]} renderOrder={2}>
        <planeGeometry args={[24.5, 13.76]} />
        <meshBasicMaterial
          map={bootScreen.texture}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
    </group>
  );
};

useLoader.preload(STLLoader, MODEL_URL);
