import React, { useState, useEffect } from 'react';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Remove static HTML loader if present
    const staticLoader = document.getElementById('static-brand-loader');
    if (staticLoader) {
      staticLoader.style.display = 'none';
    }

    // Animate progress smoothly
    const startTime = Date.now();
    const duration = 800; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsHidden(true);
          }, 600); // match transition duration
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-700 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Indlæser BusyBiz..."
      role="status"
    >
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-600/10 to-transparent blur-3xl pointer-events-none animate-pulse"></div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo with Glowing Halo */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-3xl blur-md opacity-75 animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-2xl bg-slate-900 border border-amber-400/40 p-3 shadow-2xl flex items-center justify-center">
            <img
              src="/Busybiz-mascot-transparent-Photoroom.png"
              alt="BusyBiz Logo"
              className="w-full h-full object-contain animate-bounce"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 mb-2 uppercase">
          BUSYBIZ
        </h1>
        <p className="text-amber-400/70 text-xs font-semibold tracking-widest uppercase mb-8">
          Webdesign • SEO • Marketing
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 h-2 bg-slate-900 rounded-full overflow-hidden border border-amber-500/20 p-0.5 shadow-inner relative mb-4">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(251,191,36,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex justify-between items-center w-64 sm:w-72 text-xs font-mono text-amber-300/80">
          <span className="animate-pulse">Indlæser BusyBiz...</span>
          <span className="font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
