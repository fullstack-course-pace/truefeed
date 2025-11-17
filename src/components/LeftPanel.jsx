import React, { useState, useEffect } from 'react';
import GhostCursor from './common/GhostCursor';
import FallingText from './FallingText';

const LeftPanel = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'You can easily';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-300 via-purple-500 to-indigo-700 p-12 xl:p-16 flex-col justify-between relative overflow-hidden rounded-2xl m-4">
      {/* Ghost Cursor Effect */}
      <GhostCursor
        color="#B19EEF"
        brightness={1}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1.0}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full translate-x-32 translate-y-32 blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Brand - Aligned with right side */}
        <div>
          <h1 className="text-5xl font-bold text-white tracking-tight">
            TrueFeed
          </h1>
        </div>

        {/* Main Message - At the bottom */}
        <div className="space-y-4">
          <p className="text-white/90 text-lg font-medium">
            {displayText}
          </p>
          <h2 className="text-5xl font-bold text-white leading-tight">
            Get access your personal<br />
            hub for clarity and<br />
            productivity
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;