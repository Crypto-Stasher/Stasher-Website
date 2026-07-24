import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
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

/**
 * True on touch devices (no mouse). Used to trim the scene's GPU cost, which
 * is what caused the hero to flicker black on phones: shadow maps, per-frame
 * contact shadows and a live environment cubemap are all desktop-only now.
 */
const useCoarsePointer = (): boolean => {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const updatePointer = () => setCoarse(mediaQuery.matches);

    updatePointer();
    mediaQuery.addEventListener('change', updatePointer);

    return () => mediaQuery.removeEventListener('change', updatePointer);
  }, []);

  return coarse;
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
  const coarsePointer = useCoarsePointer();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  // A single pinned value (never a range), so the drawing buffer is allocated
  // once and never reallocated mid-scroll — but at the screen's real density
  // so the model stays sharp on high-DPI phones. Capped at 2 to bound cost.
  const touchDpr = useMemo(
    () => Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1, 2),
    [],
  );

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
        // Shadow maps are an extra render target per shadow-casting light —
        // dropped on phones, where GPU memory pressure was blacking out the
        // canvas. Desktop is unchanged.
        shadows={!coarsePointer}
        // On touch devices the frameloop stays 'always'. Flipping to 'demand'
        // stops the render loop, and the compositor can then present a cleared
        // (black) buffer — one of the sources of the hero flicker on phones.
        frameloop={coarsePointer || isVisible ? 'always' : 'demand'}
        // Leave enough room for the device's diagonal radius so every
        // orientation remains inside the viewport during a full 360° spin.
        camera={{ position: [0, 0.05, 9], fov: 29 }}
        // A dpr *range* lets r3f recompute pixel ratio and reallocate the
        // drawing buffer; while the mobile URL bar animates that reallocation
        // lands mid-scroll and shows as a black flash. Pin it on touch.
        dpr={coarsePointer ? touchDpr : [1, 1.75]}
        // r3f measures the canvas via react-use-measure, which re-measures on
        // scroll by default. Every mobile scroll frame could therefore resize
        // the renderer. The element's size is CSS-driven and does not depend
        // on scroll, so stop watching it and debounce genuine resizes.
        resize={{ scroll: false, debounce: { scroll: 50, resize: 200 } }}
        gl={{
          antialias: true,
          alpha: true,
          // Keeps buffer contents after compositing, so a frame that arrives
          // late shows the previous image instead of clearing to black.
          preserveDrawingBuffer: true,
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
          castShadow={!coarsePointer}
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
          {/* ContactShadows re-renders a depth target (plus blur passes) every
              single frame by default — too costly for a phone GPU. */}
          {!coarsePointer && (
            <ContactShadows
              position={[0, -1.7, 0]}
              opacity={0.52}
              scale={5}
              blur={3}
              far={3.5}
              color="#000000"
            />
          )}
          {/* `frames={1}` bakes the environment cubemap once instead of
              keeping it live; halves the render targets held on mobile. */}
          <Environment resolution={coarsePointer ? 128 : 256} frames={1}>
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

        {/* Drag-to-spin is available on touch too. The canvas carries
            `touch-action: pan-y` on coarse pointers, so the browser keeps
            vertical scrolling and only sideways drags reach the controls. */}
        <TrackballControls
          makeDefault
          noPan
          noZoom
          rotateSpeed={coarsePointer ? 2 : 3.1}
          staticMoving={reducedMotion}
          dynamicDampingFactor={0.12}
        />
      </Canvas>
    </div>
  );
};
