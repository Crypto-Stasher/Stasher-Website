import React, { useState, useEffect } from 'react';

const HUDLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="hud-line">
    <span>{label}</span>
    <span style={{ color: '#fff' }}>[{value}]</span>
  </div>
);

export const HUD: React.FC = () => {
  const [uptime, setUptime] = useState('00:00:00');
  const [load, setLoad] = useState('0.00%');

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
      setLoad(`${(Math.random() * 2 + 0.1).toFixed(2)}%`);
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
        <HUDLine label="UPTIME" value={uptime} />
        <HUDLine label="CORE_LOAD" value={load} />
        <div className="hud-bar" style={{ marginLeft: 'auto' }} />
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
};
