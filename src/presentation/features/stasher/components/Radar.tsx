import React, { useMemo } from 'react';

export const Radar: React.FC = () => {
  const streams = useMemo(() =>
    Array.from({ length: 10 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    })),
  []);

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
      <div className="radar-ring" style={{ width: '300px', height: '300px', animationDelay: '0s' }} />
      <div className="radar-ring" style={{ width: '400px', height: '400px', animationDelay: '1s' }} />
      <div className="radar-ring" style={{ width: '500px', height: '500px', animationDelay: '2s' }} />
      
      {/* Data Streams */}
      {streams.map((stream, i) => (
        <div 
          key={i} 
          className="data-stream" 
          style={{ 
            left: stream.left, 
            top: stream.top,
            animationDelay: stream.animationDelay,
            animationDuration: stream.animationDuration
          }} 
        />
      ))}
    </div>
  );
};

