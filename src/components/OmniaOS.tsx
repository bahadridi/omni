import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Desktop from './Desktop';
import Taskbar from './Taskbar';
import SamanthaChat from './SamanthaChat';

const OmniaOS: React.FC = () => {
  // Core state management
  const [isBooting, setIsBooting] = useState(true);
  const [bootPhase, setBootPhase] = useState(0);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSamantha, setShowSamantha] = useState(false);

  // Boot sequence animation
  useEffect(() => {
    const bootSequence = [
      { delay: 1000, phase: 1 },
      { delay: 2000, phase: 2 },
      { delay: 3500, phase: 3 },
      { delay: 5000, phase: 4 }
    ];

    bootSequence.forEach(({ delay, phase }) => {
      setTimeout(() => setBootPhase(phase), delay);
    });

    setTimeout(() => setIsBooting(false), 6000);
  }, []);



  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Render background particles - Mixed phosphor dots
  const renderParticles = useMemo(() => {
    const colors = ['rgba(0,255,0,0.15)', 'rgba(255,176,0,0.12)', 'rgba(0,255,255,0.1)'];
    const glows = ['0 0 3px #00FF00', '0 0 3px #FFB000', '0 0 3px #00FFFF'];
    return (
      <div className="fixed inset-0 pointer-events-none ed-scanlines">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 2 + 1;
          const animationDuration = Math.random() * 15 + 10;
          const colorIdx = i % 3;
          return (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${Math.random() * -20}s`,
                background: colors[colorIdx],
                boxShadow: glows[colorIdx]
              }}
            />
          );
        })}
      </div>
    );
  }, []);

  // Render dynamic background - 1984 CRT Terminal
  const renderBackground = useCallback(() => (
    <div
      className="fixed inset-0 transition-all duration-1000 ease-out ed-crt-screen"
      style={{
        background: `
          radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(0, 255, 0, 0.04) 0%,
            rgba(0, 80, 40, 0.02) 25%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at center,
            rgba(2, 4, 6, 1) 0%,
            rgba(0, 0, 0, 1) 100%
          )
        `
      }}
    />
  ), [mousePosition]);

  // Boot screen component - 1984 Terminal Style
  const BootScreen = () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center ed-boot-sequence">
      <div className="text-center ed-phosphor">
        <div className="relative mb-8">
          <h1
            className={`text-6xl md:text-8xl font-terminal text-ed-amber-400
              animate-pulse tracking-wider transition-all duration-1000
              ${bootPhase >= 2 ? 'scale-110' : 'scale-90 opacity-50'}`}
            style={{ textShadow: '0 0 10px #FFB000, 0 0 20px #FFB000, 0 0 40px #CC8800' }}
          >
            EDGAR OS
          </h1>
          <div className="mt-4 text-ed-green-400/80 text-lg font-terminal ed-typing-text">
            {bootPhase >= 1 && <div className="ed-typewriter">&gt; INITIALIZING CORE SYSTEMS...</div>}
            {bootPhase >= 2 && <div className="mt-2 ed-typewriter">&gt; LOADING NEURAL INTERFACE...</div>}
            {bootPhase >= 3 && <div className="mt-2 ed-typewriter">&gt; AWAKENING CONSCIOUSNESS...</div>}
          </div>
        </div>
        <div className="flex justify-center space-x-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 transition-all duration-500
                ${i + 1 <= bootPhase
                  ? 'bg-ed-green-500 ed-led-on'
                  : 'bg-ed-green-900/50'}`}
              style={i + 1 <= bootPhase ? { boxShadow: '0 0 8px #00FF00' } : {}}
            />
          ))}
        </div>
        <div className="mt-8 text-ed-amber-600 text-sm font-terminal">
          {bootPhase >= 1 && "[ ELECTRIC DREAMS SYSTEMS v1.984 ]"}
        </div>
      </div>
    </div>
  );

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-ed-green-500 ed-crt-screen">
      {renderBackground()}
      {renderParticles}
      
      <Taskbar 
        onSettingsClick={() => {}}
        onTerminalClick={() => {}}
        onFolderClick={() => {}}

      />
      <Desktop />

      {showSamantha && (
        <SamanthaChat onClose={() => setShowSamantha(false)} />
      )}

      {/* Global animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          75% { transform: translate(-10px, 10px) rotate(-5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OmniaOS; 