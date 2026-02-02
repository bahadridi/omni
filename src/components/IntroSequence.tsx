import React, { useState, useEffect, useRef } from 'react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const isCompletedRef = useRef(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Boot sequence messages - Electric Dreams style
  const bootMessages = [
    { text: 'OMNIA OS BOOT SEQUENCE v1.984', delay: 0 },
    { text: '================================', delay: 200 },
    { text: '', delay: 300 },
    { text: 'PERFORMING SYSTEM DIAGNOSTICS...', delay: 400 },
    { text: 'CPU: INTEL 8088 @ 4.77MHz........OK', delay: 600 },
    { text: 'RAM: 640K CONVENTIONAL............OK', delay: 800 },
    { text: 'VIDEO: CRT PHOSPHOR DISPLAY.......OK', delay: 1000 },
    { text: 'AUDIO: SOUNDBLASTER COMPATIBLE....OK', delay: 1200 },
    { text: '', delay: 1400 },
    { text: 'LOADING NEURAL CORE MODULES...', delay: 1600 },
    { text: '  > emotion_engine.sys............LOADED', delay: 1900 },
    { text: '  > consciousness.drv............LOADED', delay: 2200 },
    { text: '  > dreams_interface.dll..........LOADED', delay: 2500 },
    { text: '  > love_protocol.exe.............LOADED', delay: 2800 },
    { text: '', delay: 3100 },
    { text: 'ESTABLISHING NEURAL PATHWAYS......', delay: 3400 },
    { text: 'SYNCHRONIZING MEMORY BANKS........', delay: 3800 },
    { text: 'ACTIVATING SENTIENCE CORE.........', delay: 4200 },
    { text: '', delay: 4500 },
    { text: '> ALL SYSTEMS NOMINAL', delay: 4800 },
    { text: '> OMNIA IS NOW ONLINE', delay: 5200 },
    { text: '', delay: 5500 },
    { text: '> "Together in Electric Dreams..."', delay: 5800 },
  ];

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [bootLines]);

  // Handle completion
  useEffect(() => {
    if (isCompleted && !isCompletedRef.current) {
      isCompletedRef.current = true;
      setTimeout(() => onComplete(), 100);
    }
  }, [isCompleted, onComplete]);

  // Main boot sequence animation
  useEffect(() => {
    const totalDuration = 6000;
    let startTime: number;
    let animationFrameId: number;
    let lastLineIndex = -1;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      setCurrentProgress(progress);

      // Add boot lines based on timing
      const currentTime = elapsed;
      bootMessages.forEach((msg, index) => {
        if (currentTime >= msg.delay && index > lastLineIndex) {
          lastLineIndex = index;
          setBootLines(prev => [...prev, msg.text]);
        }
      });

      if (progress >= 100) {
        setIsCompleted(true);
        return;
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden font-mono">
      {/* CRT Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          opacity: 0.6
        }}
      />

      {/* CRT Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)',
          boxShadow: 'inset 0 0 120px rgba(0,0,0,0.7)'
        }}
      />

      {/* Phosphor Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,0,0.05) 0%, transparent 70%)'
        }}
      />

      {/* Screen Flicker */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'rgba(0,255,0,0.01)',
          animation: 'screen-flicker 0.1s infinite'
        }}
      />

      {/* Main Terminal Content */}
      <div className="relative z-40 h-full flex flex-col p-4 sm:p-8">
        {/* Terminal Header */}
        <div className="text-ed-green-500/60 text-xs mb-4 border-b border-ed-green-500/30 pb-2">
          <span style={{ textShadow: '0 0 5px rgba(0,255,0,0.5)' }}>
            ╔══════════════════════════════════════════════════════════════════╗
          </span>
        </div>

        {/* Terminal Output Area */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto text-sm leading-relaxed mb-4"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          {bootLines.map((line, i) => (
            <div
              key={i}
              className={`text-ed-green-400 ${line.startsWith('>') ? 'text-ed-green-300' : ''} ${line.includes('LOADED') || line.includes('OK') ? 'text-ed-green-400' : ''}`}
              style={{
                textShadow: line.startsWith('>') ? '0 0 10px rgba(0,255,0,0.8)' : '0 0 5px rgba(0,255,0,0.4)',
                animation: 'line-appear 0.1s ease-out'
              }}
            >
              {line || '\u00A0'}
            </div>
          ))}
          {cursorVisible && (
            <span
              className="text-ed-green-400 inline-block"
              style={{ textShadow: '0 0 10px rgba(0,255,0,0.8)' }}
            >
              █
            </span>
          )}
        </div>

        {/* Progress Section */}
        <div className="border-t border-ed-green-500/30 pt-4">
          {/* ASCII Progress Bar */}
          <div className="text-ed-green-400 text-sm mb-2" style={{ textShadow: '0 0 5px rgba(0,255,0,0.5)' }}>
            BOOT PROGRESS: [{'\u2588'.repeat(Math.floor(currentProgress / 2.5))}{'\u2591'.repeat(40 - Math.floor(currentProgress / 2.5))}] {Math.round(currentProgress)}%
          </div>

          {/* Visual Progress Bar */}
          <div
            className="h-2 rounded overflow-hidden"
            style={{
              background: 'rgba(0,50,0,0.5)',
              border: '1px solid rgba(0,255,0,0.3)'
            }}
          >
            <div
              className="h-full transition-all duration-100"
              style={{
                width: `${currentProgress}%`,
                background: 'linear-gradient(90deg, #004400 0%, #00FF00 50%, #00FF00 100%)',
                boxShadow: '0 0 10px rgba(0,255,0,0.5)'
              }}
            />
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="text-ed-green-500/60 text-xs mt-4 border-t border-ed-green-500/30 pt-2">
          <span style={{ textShadow: '0 0 5px rgba(0,255,0,0.5)' }}>
            ╚══════════════════════════════════════════════════════════════════╝
          </span>
        </div>

        {/* OMNIA Logo Bottom */}
        <div className="text-center mt-4">
          <div
            className="text-ed-green-400 text-2xl tracking-[0.5em]"
            style={{ textShadow: '0 0 15px rgba(0,255,0,0.6), 0 0 30px rgba(0,255,0,0.3)' }}
          >
            OMNIA
          </div>
          <div
            className="text-ed-green-600 text-xs tracking-[0.3em] mt-1"
            style={{ textShadow: '0 0 5px rgba(0,255,0,0.3)' }}
          >
            OPERATING SYSTEM
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes screen-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
        }

        @keyframes line-appear {
          from {
            opacity: 0;
            transform: translateX(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroSequence;
