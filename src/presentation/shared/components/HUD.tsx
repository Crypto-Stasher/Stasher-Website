import React, { useEffect, useRef, memo } from 'react';

const HUDLine: React.FC<{ label: string; value?: string; valueRef?: React.RefObject<HTMLSpanElement | null> }> = ({ label, value, valueRef }) => (
  <div className="hud-line">
    <span>{label}</span>
    <span className="hud-value-text" ref={valueRef}>[{value ?? ''}]</span>
  </div>
);

export const HUD: React.FC = memo(() => {
  const uptimeRef = useRef<HTMLSpanElement>(null);
  const loadRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');

      if (uptimeRef.current) {
        uptimeRef.current.textContent = `[${h}:${m}:${s}]`;
      }
      if (loadRef.current) {
        loadRef.current.textContent = `[${(Math.random() * 2 + 0.1).toFixed(2)}%]`;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hud-corner hud-top-left">
        <HUDLine label="SYSTEM_AUTH" value="ENCRYPTED" />
        <HUDLine label="MODE" value="STEALTH" />
        <div className="hud-bar" />
      </div>
      <div className="hud-corner hud-top-right">
        <HUDLine label="UPTIME" valueRef={uptimeRef} value="00:00:00" />
        <HUDLine label="CORE_LOAD" valueRef={loadRef} value="0.00%" />
        <div className="hud-bar hud-bar--right" />
      </div>
      <div className="hud-corner hud-bottom-left">
        <HUDLine label="LOC_LAT" value="48.8566 N" />
        <HUDLine label="LOC_LNG" value="2.3522 E" />
      </div>
      <div className="hud-corner hud-bottom-right">
        <HUDLine label="STASHER_OS" value="V2.1.0-STABLE" />
        <HUDLine label="SEC_LVL" value="MAXIMUM" />
      </div>
    </>
  );
});

