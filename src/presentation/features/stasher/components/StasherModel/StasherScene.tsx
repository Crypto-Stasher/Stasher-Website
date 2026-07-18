import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Lightformer,
  RoundedBox,
  TrackballControls,
} from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../../../../application/context/ThemeContext';
import { HeroStageEffects } from './HeroStageEffects';
import { StasherModel } from './StasherModel';

interface StasherSceneProps {
  /** Static image shown when WebGL is unavailable. */
  fallbackSrc: string;
  alt: string;
}

/** Returns true once WebGL availability has been checked. */
const use3DEnabled = (): boolean | null => {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const canvas = document.createElement('canvas');
        const webgl = Boolean(
          window.WebGLRenderingContext
          && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
        );
        setEnabled(webgl);
      } catch {
        setEnabled(false);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return enabled;
};

const useReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
};

const DevicePlaceholder = () => (
  <group rotation={[0.035, -0.22, -0.025]}>
    <RoundedBox args={[2, 3.1, 0.42]} radius={0.18} smoothness={6}>
      <meshStandardMaterial color="#242a27" metalness={0.35} roughness={0.34} />
    </RoundedBox>
    <mesh position={[0, 0.49, 0.216]}>
      <planeGeometry args={[1.22, 0.69]} />
      <meshBasicMaterial color="#020202" />
    </mesh>
  </group>
);

export const StasherScene: React.FC<StasherSceneProps> = ({ fallbackSrc, alt }) => {
  const enabled = use3DEnabled();
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '180px 0px', threshold: 0 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [enabled]);

  const fallback = (
    <img
      src={fallbackSrc}
      alt={alt}
      className="hero-device-img"
      width={540}
      height={640}
      fetchPriority="high"
      decoding="async"
    />
  );

  if (!enabled) return fallback;

  return (
    <div className="hero-canvas" role="img" aria-label={alt} ref={wrapperRef}>
      <Canvas
        shadows
        frameloop={isVisible ? 'always' : 'demand'}
        // Leave enough room for the device's diagonal radius so every
        // orientation remains inside the viewport during a full 360° spin.
        camera={{ position: [0, 0.05, 9], fov: 29 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={isLight ? 0.62 : 0.48} />
        <hemisphereLight
          intensity={isLight ? 0.82 : 0.72}
          groundColor={isLight ? '#d5d3cb' : '#050706'}
          color="#f3fff9"
        />
        <spotLight
          position={[3.4, 5.5, 5.8]}
          angle={0.48}
          penumbra={0.85}
          intensity={6.4}
          color="#f7fff9"
          castShadow
        />
        <spotLight
          position={[-1.4, 0.4, 7]}
          angle={0.72}
          penumbra={1}
          intensity={3.2}
          color="#d9e2dd"
        />
        <directionalLight position={[-4, 1.5, 4]} intensity={3.4} color="#d8e4de" />
        <pointLight position={[3.5, -2, 2.5]} intensity={2.3} color="#c9b6ff" />

        <HeroStageEffects reducedMotion={reducedMotion} theme={theme} />

        <Suspense fallback={<DevicePlaceholder />}>
          <StasherModel reducedMotion={reducedMotion} />
          <ContactShadows
            position={[0, -1.7, 0]}
            opacity={0.52}
            scale={5}
            blur={3}
            far={3.5}
            color="#000000"
          />
          <Environment resolution={256}>
            <Lightformer
              intensity={5.5}
              position={[0, 3, 4]}
              scale={[5, 1.2, 1]}
              color="#ffffff"
            />
            <Lightformer
              intensity={4}
              position={[-4, 0.5, 2]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[4, 5, 1]}
              color="#d6e8df"
            />
            <Lightformer
              intensity={3.2}
              position={[4, -0.8, 1]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[3, 5, 1]}
              color="#d1c3ff"
            />
            <Lightformer
              intensity={1}
              position={[0, -3, -4]}
              scale={[8, 3, 1]}
              color="#101412"
            />
          </Environment>
        </Suspense>

        <TrackballControls
          makeDefault
          noPan
          noZoom
          rotateSpeed={3.1}
          staticMoving={reducedMotion}
          dynamicDampingFactor={0.12}
        />
      </Canvas>
    </div>
  );
};
