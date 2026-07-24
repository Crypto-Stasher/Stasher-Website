import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import btc from 'cryptocurrency-icons/svg/color/btc.svg';
import eth from 'cryptocurrency-icons/svg/color/eth.svg';
import sol from 'cryptocurrency-icons/svg/color/sol.svg';
import xrp from 'cryptocurrency-icons/svg/color/xrp.svg';
import dot from 'cryptocurrency-icons/svg/color/dot.svg';
import ltc from 'cryptocurrency-icons/svg/color/ltc.svg';
import ada from 'cryptocurrency-icons/svg/color/ada.svg';
import { createCoinTexture } from './coinTexture';

/**
 * Layout is hand-placed rather than random so it composes the same every load.
 *
 * `nx`/`ny` are fractions of the visible viewport (-1..1) rather than world
 * units, so the coins hug the edges at any section width and never drift over
 * the centred heading and chips. Fixed world coordinates looked right on a
 * wide desktop and fell completely outside the frame on a phone.
 */
interface CoinSpec {
  logo: string;
  edge: string;
  /** Horizontal position as a fraction of half the viewport width. */
  nx: number;
  /** Vertical position as a fraction of half the viewport height. */
  ny: number;
  depth: number;
  radius: number;
  /** Seconds per turn — varied so the coins never move as a block. */
  spin: number;
  /** Phase offset for the bob, in radians. */
  phase: number;
}

const COINS: CoinSpec[] = [
  { logo: btc, edge: '#e9a03c', nx: -0.82, ny: 0.52, depth: -1.2, radius: 0.95, spin: 9, phase: 0 },
  { logo: eth, edge: '#8f9fd4', nx: -0.62, ny: -0.62, depth: -0.6, radius: 0.72, spin: 11, phase: 1.1 },
  { logo: sol, edge: '#9d7bd8', nx: 0.64, ny: 0.62, depth: -1.8, radius: 0.7, spin: 13, phase: 2.2 },
  { logo: ada, edge: '#6f9bd1', nx: 0.5, ny: -0.58, depth: -1.4, radius: 0.6, spin: 10, phase: 3.4 },
  { logo: xrp, edge: '#9aa4ab', nx: 0.86, ny: -0.1, depth: -0.9, radius: 0.78, spin: 12, phase: 4.1 },
  { logo: dot, edge: '#d97ba8', nx: -0.93, ny: -0.28, depth: -2.2, radius: 0.62, spin: 14, phase: 5.0 },
  { logo: ltc, edge: '#a8b0b8', nx: 0.93, ny: 0.7, depth: -3.0, radius: 0.5, spin: 15, phase: 5.8 },
];

interface CoinProps {
  spec: CoinSpec;
  texture: THREE.CanvasTexture;
  reducedMotion: boolean;
}

const Coin: React.FC<CoinProps> = ({ spec, texture, reducedMotion }) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Keep the coins pinned to the edges of whatever space the section occupies.
  const anchorX = spec.nx * (viewport.width / 2);
  const anchorY = spec.ny * (viewport.height / 2);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Turn about the vertical axis so the disc reads face -> edge -> face.
    group.current.rotation.y = spec.phase + (t / spec.spin) * Math.PI * 2;
    // Gentle drift, so they hang in the air rather than sit on a plane.
    group.current.position.y = anchorY + Math.sin(t * 0.55 + spec.phase) * 0.16;
    group.current.rotation.z = Math.sin(t * 0.4 + spec.phase) * 0.09;
  });

  return (
    <group ref={group} position={[anchorX, anchorY, spec.depth]} rotation={[0, spec.phase, 0]}>
      {/* Faces point at the camera; the parent's Y rotation spins the disc. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[spec.radius, spec.radius, spec.radius * 0.13, 44]} />
        <meshStandardMaterial attach="material-0" color={spec.edge} metalness={0.95} roughness={0.32} />
        <meshStandardMaterial attach="material-1" map={texture} metalness={0.45} roughness={0.42} />
        <meshStandardMaterial attach="material-2" map={texture} metalness={0.45} roughness={0.42} />
      </mesh>
    </group>
  );
};

const useCoinTextures = (): THREE.CanvasTexture[] | null => {
  const [textures, setTextures] = useState<THREE.CanvasTexture[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loaded: THREE.CanvasTexture[] = [];

    Promise.all(COINS.map((coin) => createCoinTexture(coin.logo)))
      .then((result) => {
        loaded = result;
        if (cancelled) {
          result.forEach((texture) => texture.dispose());
          return;
        }
        setTextures(result);
      })
      .catch(() => {
        // A missing logo shouldn't take the section down — the chips below
        // already carry the same information.
        if (!cancelled) setTextures(null);
      });

    return () => {
      cancelled = true;
      loaded.forEach((texture) => texture.dispose());
    };
  }, []);

  return textures;
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return matches;
};

const Scene: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const textures = useCoinTextures();
  if (!textures) return null;

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 6]} intensity={2.4} color="#fdfdf8" />
      <pointLight position={[-5, -2, 3]} intensity={12} distance={16} color="#6fd6e0" />
      {COINS.map((spec, index) => (
        <Coin key={index} spec={spec} texture={textures[index]} reducedMotion={reducedMotion} />
      ))}
    </>
  );
};

/**
 * Decorative layer of floating coins behind the supported-assets chips.
 *
 * Deliberately cheap: no shadow maps, no environment map, seven low-poly
 * discs. The hero taught us that a phone GPU will black-flicker a canvas it
 * cannot keep up with, so the same guards apply here — pinned dpr on touch,
 * no re-measure on scroll, and the loop parked while the section is off-screen.
 */
export const FloatingCoins: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const coarsePointer = useMediaQuery('(pointer: coarse)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const touchDpr = useMemo(
    () => Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1, 2),
    [],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px', threshold: 0 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="floating-coins" ref={wrapperRef} aria-hidden="true">
      <Canvas
        // Parked entirely when off-screen — it is decorative, and this keeps
        // it from burning battery while the rest of the page is read.
        frameloop={isVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={coarsePointer ? touchDpr : [1, 1.75]}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 200 } }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};
