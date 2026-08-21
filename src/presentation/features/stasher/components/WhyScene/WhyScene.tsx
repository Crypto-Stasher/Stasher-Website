import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../../../../application/context/ThemeContext';
import { ChipModel } from './ChipModel';
import { StackDevice } from './StackDevice';
import { CoinsObject, STAGE_OFFSET_X, STAGE_OFFSET_Y, STAGE_SCALE } from './whyObjects';

interface WhySceneProps {
  /** Index of the slide currently on screen. */
  active: number;
  reducedMotion: boolean;
}

/**
 * Each object sits on its own slide's half, derived from its index — the same
 * alternation the copy uses. Deriving it from the *active* index instead would
 * teleport an outgoing object across the stage the moment the index changed,
 * while it was still fading out.
 */
const objectSide = (index: number) => (index % 2 === 0 ? 1 : -1);

/**
 * Indexed to match the reasons in order. `null` marks one illustrated by a
 * video clip instead — the slot stays so the indices keep lining up.
 */
const OBJECTS: (React.FC<{
  accent: string;
  secondary: string;
  surface: string;
  background: string;
  side: number;
}> | null)[] = [
  null,
  // Suspense sits inside the Canvas: without it the loading model would
  // suspend the whole scene and blank every other object.
  ({ accent }) => (
    <Suspense fallback={null}>
      <ChipModel accent={accent} />
    </Suspense>
  ),
  null,
  ({ accent }) => (
    <Suspense fallback={null}>
      <StackDevice accent={accent} />
    </Suspense>
  ),
  CoinsObject,
  null,
];

/**
 * Eases the active object in and the previous one out, so the swap matches the
 * copy's cross-fade instead of popping.
 */
const Stage: React.FC<WhySceneProps & {
  accent: string;
  secondary: string;
  surface: string;
  background: string;
}> = ({
  active,
  reducedMotion,
  accent,
  secondary,
  surface,
  background,
}) => {
  const groups = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    const step = Math.min(delta, 1 / 30) * 4.5;

    groups.current.forEach((group, index) => {
      if (!group) return;

      const target = index === active ? 1 : 0;
      const next = THREE.MathUtils.lerp(group.scale.x, target, step);
      group.scale.setScalar(next);
      // Nothing to draw below a sliver; skipping it keeps 5 idle objects from
      // costing draw calls every frame.
      group.visible = next > 0.01;
      group.position.z = (1 - next) * -2.5;
    });
  });

  return (
    <>
      {OBJECTS.map((ObjectComponent, index) => (
        ObjectComponent ? (
          // Centred in its own half, opposite that slide's copy.
          <group
            key={index}
            position={[STAGE_OFFSET_X * objectSide(index), STAGE_OFFSET_Y, 0]}
            scale={STAGE_SCALE}
          >
            <group
              ref={(node) => { groups.current[index] = node; }}
              scale={index === active ? 1 : 0}
              visible={index === active}
            >
              <ObjectComponent
                accent={accent}
                secondary={secondary}
                surface={surface}
                background={background}
                side={objectSide(index)}
              />
            </group>
          </group>
        ) : null
      ))}

      {!reducedMotion && <SceneDrift />}
    </>
  );
};

/** A slow float applied to the whole stage, so the object is never dead still. */
const SceneDrift: React.FC = () => {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.12) * 0.28;
    state.camera.position.y = Math.sin(t * 0.09) * 0.2;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

/**
 * The 3D layer behind the Why Stasher copy: one object per reason, swapped
 * with the slide. Deliberately a single canvas rather than one per slide —
 * six WebGL contexts on one page is a fast way to lose the whole section.
 */
export const WhyScene: React.FC<WhySceneProps> = ({ active, reducedMotion }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const accent = isLight ? '#0c7d5b' : '#b8ffe3';
  const secondary = isLight ? '#6b46a8' : '#d2baff';
  // Well clear of the page background in both themes: at near-black the solid
  // objects read as flat cut-outs rather than lit geometry.
  const surface = isLight ? '#c3ccc7' : '#39443f';
  // What the far end of the coin field dissolves into. Instance colour can only
  // darken a lit face, so the light theme recedes into a warm grey rather than
  // its own cream background — fading toward the page colour there is a no-op
  // and leaves the far coins as loud as the near ones.
  const background = isLight ? '#b6b0a2' : '#050606';

  return (
    <Canvas
      className="why-scene-canvas"
      camera={{ position: [0, 0, 7.2], fov: 32 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 200 } }}
    >
      <ambientLight intensity={isLight ? 0.9 : 0.55} />
      <hemisphereLight
        intensity={isLight ? 0.7 : 0.5}
        color="#f3fff9"
        groundColor={isLight ? '#cfcabd' : '#050806'}
      />
      <directionalLight position={[3, 4, 5]} intensity={isLight ? 2.2 : 2.8} color="#f7fff9" />
      <pointLight position={[-3.5, -1.5, 2.5]} intensity={2.4} color={secondary} />
      {/* Rim light from behind: separates the silhouette from the background,
          which is what the dark theme was missing entirely. */}
      <pointLight position={[4, 1.5, -4]} intensity={isLight ? 3 : 6} color={accent} />

      <Stage
        active={active}
        reducedMotion={reducedMotion}
        accent={accent}
        secondary={secondary}
        surface={surface}
        background={background}
      />
    </Canvas>
  );
};
