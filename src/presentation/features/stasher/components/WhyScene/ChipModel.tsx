import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const MODEL_URL = `${import.meta.env.BASE_URL}models/tqfp-32.glb`;

interface ChipModelProps {
  accent: string;
}

/**
 * 02 — Certified secure element: the real TQFP-32 package.
 *
 * Converted from the supplied STEP: tessellated with OpenCASCADE, centred and
 * normalised to ~2.2 units across, then split into two meshes — body and leads
 * — so each can take its own material. Everything here is the CAD geometry;
 * only the surfacing is ours.
 */
export const ChipModel: React.FC<ChipModelProps> = ({ accent }) => {
  const group = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, MODEL_URL);

  // The loader caches one scene per URL, so it has to be cloned before this
  // component mutates any materials on it.
  const model = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const isLead = child.name.toLowerCase().includes('lead');
      // Low metalness on purpose: this scene has no environment map, and a
      // fully metallic material with nothing to reflect renders near-black.
      child.material = new THREE.MeshStandardMaterial(
        isLead
          ? { color: '#eef1ef', metalness: 0.22, roughness: 0.38 }
          : { color: '#8b8e8b', metalness: 0.02, roughness: 0.92 },
      );
      child.castShadow = false;
      child.receiveShadow = false;
    });

    return scene;
  }, [gltf]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    // Near face-on with a slow settle, so the leads stay legible as leads.
    // Raking it further turns the package into a slab seen edge-on.
    group.current.rotation.x = -0.34 + Math.sin(t * 0.22) * 0.07;
    group.current.rotation.z = -0.32 + Math.sin(t * 0.17) * 0.06;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.12;
  });

  return (
    <group ref={group} scale={1.3}>
      {/* The package is modelled lying flat in Z-up CAD space; stand it up to
          face the camera. */}
      <primitive object={model} />
      <pointLight position={[1.4, 1.6, 2.4]} intensity={2.4} distance={7} color={accent} />
    </group>
  );
};
