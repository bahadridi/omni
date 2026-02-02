import React, { useState, useEffect, useRef } from 'react';

interface PreIntroLoaderProps {
  onComplete: () => void;
}

const PreIntroLoader: React.FC<PreIntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const isAnimatingRef = useRef(false);
  const isPressedRef = useRef(false);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Boot messages that appear during loading
  const bootMessages = [
    'OMNIA BIOS v1.984',
    'COPYRIGHT (C) 1984 ELECTRIC DREAMS INC.',
    '',
    'INITIALIZING CRT DISPLAY...',
    'PHOSPHOR TUBES: OK',
    'MEMORY TEST: 640K OK',
    'LOADING NEURAL PATHWAYS...',
    'SYNCING EMOTION CORES...',
    'ACTIVATING CONSCIOUSNESS...',
    '',
    '> OMNIA ONLINE',
    '> HELLO, FRIEND.'
  ];

  // Add boot lines as progress increases
  useEffect(() => {
    const lineIndex = Math.floor((progress / 100) * bootMessages.length);
    if (lineIndex > bootLines.length && isPressed) {
      setBootLines(bootMessages.slice(0, lineIndex));
    }
  }, [progress, isPressed]);

  // Handle press and hold animation
  useEffect(() => {
    if (!isPressed) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      startTimeRef.current = undefined;
      isAnimatingRef.current = false;

      // Reset progress slowly when released
      if (progress < 100 && progress > 0) {
        const resetInterval = setInterval(() => {
          setProgress(prev => {
            const newProgress = Math.max(0, prev - 5);
            if (newProgress <= 0) {
              clearInterval(resetInterval);
              setPhase(0);
              setBootLines([]);
            } else {
              if (newProgress >= 80) setPhase(4);
              else if (newProgress >= 60) setPhase(3);
              else if (newProgress >= 40) setPhase(2);
              else if (newProgress >= 20) setPhase(1);
              else setPhase(0);
            }
            return newProgress;
          });
        }, 30);
        return () => clearInterval(resetInterval);
      }
      return;
    }

    // Start animation when pressed
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      const duration = 4000; // 4 seconds for full boot

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        if (!isPressedRef.current) {
          isAnimatingRef.current = false;
          return;
        }

        const elapsed = timestamp - startTimeRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 80) setPhase(4);
        else if (newProgress >= 60) setPhase(3);
        else if (newProgress >= 40) setPhase(2);
        else if (newProgress >= 20) setPhase(1);
        else setPhase(0);

        if (newProgress >= 100) {
          isAnimatingRef.current = false;
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onComplete(), 200);
          }, 500);
        } else {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPressed, onComplete]);

  // Event handlers
  const handlePressStart = () => {
    setIsPressed(true);
    isPressedRef.current = true;
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    isPressedRef.current = false;
  };

  useEffect(() => {
    document.addEventListener('mouseup', handlePressEnd);
    document.addEventListener('touchend', handlePressEnd);
    return () => {
      document.removeEventListener('mouseup', handlePressEnd);
      document.removeEventListener('touchend', handlePressEnd);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} cursor-pointer select-none`}
      style={{ touchAction: 'none' }}
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* CRT Screen Background - Deep Black */}
      <div className="absolute inset-0 bg-black">
        {/* CRT warm-up glow */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: isPressed
              ? `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,${50 + phase * 40},0,${0.1 + phase * 0.05}) 0%, transparent 70%)`
              : 'transparent'
          }}
        />
      </div>

      {/* Scanlines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          opacity: 0.7
        }}
      />

      {/* CRT Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
        }}
      />

      {/* Screen Flicker Effect */}
      {isPressed && (
        <div
          className="absolute inset-0 pointer-events-none z-5"
          style={{
            background: 'rgba(0,255,0,0.02)',
            animation: 'crt-flicker 0.1s infinite'
          }}
        />
      )}

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 font-mono">

        {/* OMNIA Logo - ASCII Art Style */}
        <div className="mb-8 text-center">
          <pre
            className="text-ed-green-400 text-xs sm:text-sm leading-tight transition-all duration-300"
            style={{
              textShadow: isPressed
                ? `0 0 ${10 + phase * 5}px rgba(0,255,0,0.8), 0 0 ${20 + phase * 5}px rgba(0,255,0,0.4)`
                : '0 0 5px rgba(0,255,0,0.3)',
              opacity: isPressed ? 0.3 + phase * 0.15 : 0.5
            }}
          >
{`
  ██████╗ ███╗   ███╗███╗   ██╗██╗ █████╗
 ██╔═══██╗████╗ ████║████╗  ██║██║██╔══██╗
 ██║   ██║██╔████╔██║██╔██╗ ██║██║███████║
 ██║   ██║██║╚██╔╝██║██║╚██╗██║██║██╔══██║
 ╚██████╔╝██║ ╚═╝ ██║██║ ╚████║██║██║  ██║
  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
`}
          </pre>
          <div
            className="text-ed-green-500/70 text-sm tracking-[0.5em] mt-2 transition-all duration-300"
            style={{
              textShadow: '0 0 10px rgba(0,255,0,0.5)',
              opacity: isPressed ? 0.5 + phase * 0.1 : 0.4
            }}
          >
            OPERATING SYSTEM
          </div>
        </div>

        {/* Boot Terminal Output */}
        {isPressed && bootLines.length > 0 && (
          <div
            className="w-full max-w-lg px-8 mb-8 text-left"
            style={{ maxHeight: '200px', overflow: 'hidden' }}
          >
            {bootLines.map((line, i) => (
              <div
                key={i}
                className="text-ed-green-400 text-xs sm:text-sm font-mono"
                style={{
                  textShadow: '0 0 5px rgba(0,255,0,0.5)',
                  animation: 'typewriter-line 0.3s ease-out',
                  opacity: line.startsWith('>') ? 1 : 0.7
                }}
              >
                {line}
              </div>
            ))}
            {cursorVisible && (
              <span className="text-ed-green-400" style={{ textShadow: '0 0 10px rgba(0,255,0,0.8)' }}>
                █
              </span>
            )}
          </div>
        )}

        {/* Progress Bar - Terminal Style */}
        {isPressed && (
          <div className="w-full max-w-md px-8">
            <div className="flex items-center text-ed-green-400 text-xs font-mono mb-2">
              <span style={{ textShadow: '0 0 5px rgba(0,255,0,0.5)' }}>
                LOADING: [{'\u2588'.repeat(Math.floor(progress / 5))}{'\u2591'.repeat(20 - Math.floor(progress / 5))}] {Math.round(progress)}%
              </span>
            </div>
          </div>
        )}

        {/* Instructions - Press to Boot */}
        {!isPressed && (
          <div className="text-center mt-8">
            <div
              className="text-ed-green-400 text-lg font-mono tracking-wider mb-2"
              style={{
                textShadow: '0 0 10px rgba(0,255,0,0.6)',
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}
            >
              [ PRESS AND HOLD TO BOOT ]
            </div>
            <div
              className="text-ed-green-600 text-xs font-mono"
              style={{ textShadow: '0 0 5px rgba(0,255,0,0.3)' }}
            >
              Hold down to initialize OMNIA OS
            </div>
          </div>
        )}

        {/* Power indicator */}
        <div className="absolute bottom-8 left-8 flex items-center space-x-2">
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: isPressed ? '#00FF00' : '#004400',
              boxShadow: isPressed ? '0 0 10px #00FF00, 0 0 20px #00FF00' : 'none'
            }}
          />
          <span
            className="text-ed-green-600 text-xs font-mono"
            style={{ textShadow: '0 0 3px rgba(0,255,0,0.3)' }}
          >
            {isPressed ? 'POWER ON' : 'STANDBY'}
          </span>
        </div>

        {/* Version info */}
        <div className="absolute bottom-8 right-8 text-ed-green-700 text-xs font-mono">
          <span style={{ textShadow: '0 0 3px rgba(0,255,0,0.2)' }}>
            OMNIA BIOS v1.984
          </span>
        </div>
      </div>

      {/* CRT Phosphor Afterglow on completion */}
      {progress >= 100 && (
        <div
          className="absolute inset-0 z-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,255,0,0.3) 0%, transparent 50%)',
            animation: 'flash-white 0.5s ease-out'
          }}
        />
      )}

      {/* Inline styles for animations */}
      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
          25%, 75% { opacity: 0.99; }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.7;
            text-shadow: 0 0 10px rgba(0,255,0,0.6);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(0,255,0,0.8), 0 0 30px rgba(0,255,0,0.4);
          }
        }

        @keyframes typewriter-line {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes flash-white {
          0% {
            background: radial-gradient(circle at 50% 50%, rgba(0,255,0,0.8) 0%, transparent 30%);
          }
          100% {
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(0,255,0,0.3) 50%, transparent 70%);
          }
        }
      `}</style>
    </div>
  );
};

export default PreIntroLoader;
