import React, { useEffect, useRef } from 'react';

const SCREEN_URL = `${import.meta.env.BASE_URL}screens/stasher-home.png`;

const DETAILS = [
  {
    index: '01',
    title: 'Verify on-device',
    description: 'A dedicated pixel display shows exactly what you are about to approve.',
  },
  {
    index: '02',
    title: 'Pocket-sized vault',
    description: 'A compact 40 × 62 × 9 mm shell, rendered from the real production model.',
  },
  {
    index: '03',
    title: 'Physical consent',
    description: 'Nothing signs until you check the details and confirm on the hardware.',
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export const Exploded: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const detailListRef = useRef<HTMLDivElement>(null);
  const stageReadoutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const detailList = detailListRef.current;
    if (!section || !visual || !detailList) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const details = Array.from(detailList.querySelectorAll<HTMLElement>('.device-detail'));
    let currentProgress = reducedMotion.matches ? 1 : 0;
    let targetProgress = currentProgress;
    let animationFrame = 0;

    const applyProgress = (rawProgress: number) => {
      const progress = smoothstep(rawProgress);
      const stage = Math.min(2, Math.floor(progress * 3));
      const wireOpacity = Math.sin(progress * Math.PI) * 0.58;

      visual.style.setProperty('--body-x', `${-56 - progress * 12}%`);
      visual.style.setProperty('--body-y', `${-46 + progress * 12}%`);
      visual.style.setProperty('--body-z', `${progress * -90}px`);
      visual.style.setProperty('--glass-x', `${-52 + progress * 7}%`);
      visual.style.setProperty('--glass-y', `${-46 - progress * 16}%`);
      visual.style.setProperty('--glass-z', `${8 + progress * 82}px`);
      visual.style.setProperty('--screen-x', `${-50 + progress * 28}%`);
      visual.style.setProperty('--screen-y', `${-155 + progress * 27}%`);
      visual.style.setProperty('--screen-z', `${16 + progress * 154}px`);
      visual.style.setProperty('--layer-rotation', `${-6 - progress * 9}deg`);
      visual.style.setProperty('--shadow-scale', `${1 - progress * 0.32}`);
      visual.style.setProperty('--wire-opacity', wireOpacity.toFixed(3));
      visual.style.setProperty('--scan-y', `${14 + progress * 72}%`);
      visual.style.setProperty('--scan-opacity', `${0.18 + wireOpacity}`);
      visual.dataset.motionStage = String(stage);

      details.forEach((detail, index) => {
        detail.classList.toggle('device-detail--active', index === stage);
      });
      if (stageReadoutRef.current) {
        stageReadoutRef.current.textContent = `0${stage + 1} / 03`;
      }
    };

    const animateProgress = () => {
      currentProgress += (targetProgress - currentProgress) * 0.14;
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }
      applyProgress(currentProgress);
      if (currentProgress !== targetProgress) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      } else {
        animationFrame = 0;
      }
    };

    const updateScrollTarget = () => {
      if (reducedMotion.matches) {
        targetProgress = 1;
      } else {
        const rect = section.getBoundingClientRect();
        const viewport = window.innerHeight;
        const travel = Math.max(rect.height - viewport * 0.72, viewport * 0.7);
        targetProgress = clamp((viewport * 0.14 - rect.top) / travel);
      }
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    const updatePointerTilt = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === 'touch') return;
      const bounds = visual.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      visual.style.setProperty('--stack-tilt-x', `${-y * 4.5}deg`);
      visual.style.setProperty('--stack-tilt-y', `${x * 6.5}deg`);
      visual.style.setProperty('--glow-x', `${(x + 1) * 50}%`);
      visual.style.setProperty('--glow-y', `${(y + 1) * 50}%`);
    };

    const resetPointerTilt = () => {
      visual.style.setProperty('--stack-tilt-x', '0deg');
      visual.style.setProperty('--stack-tilt-y', '0deg');
      visual.style.setProperty('--glow-x', '52%');
      visual.style.setProperty('--glow-y', '38%');
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        targetProgress = 1;
        resetPointerTilt();
      }
      updateScrollTarget();
    };

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', updateScrollTarget, { passive: true });
    visual.addEventListener('pointermove', updatePointerTilt, { passive: true });
    visual.addEventListener('pointerleave', resetPointerTilt);
    reducedMotion.addEventListener('change', handleMotionPreference);
    applyProgress(currentProgress);
    updateScrollTarget();

    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', updateScrollTarget);
      visual.removeEventListener('pointermove', updatePointerTilt);
      visual.removeEventListener('pointerleave', resetPointerTilt);
      reducedMotion.removeEventListener('change', handleMotionPreference);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="device" className="device-anatomy" ref={sectionRef}>
      <div className="container">
        <div className="device-anatomy-heading">
          <p className="section-title">01 / The device</p>
          <h2 className="section-heading reveal-blur">
            Security you can see.
          </h2>
          <p className="section-description reveal">
            The screen, shell, and physical approval work as one quiet ritual:
            inspect first, sign second.
          </p>
        </div>

        <div className="device-anatomy-layout">
          <div
            className="exploded-visual reveal-scale"
            aria-label="Animated Stasher shell, optical layer, and display"
            role="img"
            ref={visualRef}
          >
            <div className="exploded-depth-field" aria-hidden="true" />
            <div className="exploded-scan" aria-hidden="true">
              <span>SURFACE SCAN</span>
            </div>
            <div className="exploded-stack">
              <div className="exploded-shadow" aria-hidden="true" />
              <div className="exploded-layer exploded-layer--body" aria-hidden="true">
                <span className="exploded-shell-grid" />
                <span className="exploded-hotspot exploded-hotspot--screen" />
                <span className="exploded-hotspot exploded-hotspot--confirm" />
                <span className="exploded-body-label">STASHER</span>
              </div>
              <div className="exploded-layer exploded-layer--glass" aria-hidden="true" />
              <div className="exploded-layer exploded-layer--screen">
                <div className="exploded-screen-crop">
                  <img src={SCREEN_URL} alt="Stasher logo on the device display" />
                </div>
              </div>
            </div>
            <div className="exploded-stage-readout" aria-hidden="true">
              <span>SCAN STAGE</span>
              <strong ref={stageReadoutRef}>01 / 03</strong>
            </div>
            <div className="exploded-axis" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="device-detail-list stagger" ref={detailListRef}>
            {DETAILS.map((detail) => (
              <article key={detail.index} className="device-detail stagger-item">
                <span className="device-detail-index">{detail.index}</span>
                <div>
                  <h3>{detail.title}</h3>
                  <p>{detail.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
