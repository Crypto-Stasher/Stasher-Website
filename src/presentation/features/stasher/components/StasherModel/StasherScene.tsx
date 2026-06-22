import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { StasherModel } from './StasherModel';

interface StasherSceneProps {
  /** Static image shown when 3D can't or shouldn't run. */
  fallbackSrc: string;
  alt: string;
}

/** Returns true once we've confirmed WebGL is available and motion is allowed. */
const use3DEnabled = (): boolean | null => {
  // null = undecided (first paint / SSR) -> render the safe static fallback.
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setEnabled(false);
      return;
    }
    let webgl = false;
    try {
      const canvas = document.createElement('canvas');
      webgl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      webgl = false;
    }
    setEnabled(webgl);
  }, []);

  return enabled;
};

export const StasherScene: React.FC<StasherSceneProps> = ({ fallbackSrc, alt }) => {
  const enabled = use3DEnabled();

  const fallback = (
    <img
      src={fallbackSrc}
      alt={alt}
      className="hero-device-img"
      width={540}
      height={540}
      fetchPriority="high"
      decoding="async"
    />
  );

  if (!enabled) return fallback;

  return (
    <div className="hero-canvas" role="img" aria-label={alt}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Brighter, balanced rig — body should read clearly, not sink to black */}
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.6} groundColor="#202833" color="#cfeeff" />
        <spotLight position={[4, 6, 6]} angle={0.5} penumbra={1} intensity={3} castShadow />
        <directionalLight position={[-2, 3, 4]} intensity={1.2} />
        <pointLight position={[-4, -1, 3]} intensity={1.2} color="#8fb6f2" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
            <StasherModel />
          </Float>

          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.45}
            scale={6}
            blur={2.6}
            far={3}
            color="#000000"
          />

          {/* Procedural studio reflections — no external HDRI download */}
          <Environment resolution={256}>
            <Lightformer intensity={3} position={[0, 2, 4]} scale={[6, 3, 1]} color="#bfe9ff" />
            <Lightformer intensity={2} position={[-4, 1, 2]} scale={[3, 6, 1]} color="#ffffff" />
            <Lightformer intensity={1.5} position={[4, -1, 2]} scale={[3, 6, 1]} color="#f78fb3" />
            <Lightformer intensity={2} position={[0, -3, -3]} scale={[8, 4, 1]} color="#1a2230" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
};
