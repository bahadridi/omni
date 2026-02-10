import React, { useState } from 'react';
import { useMobile } from '../hooks/useMobile';

// Import the character images
import edgarImage from '../assets/edgar.png';

interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  terminalName: string;
}

interface SideDockProps {
  onCharacterClick?: (characterId: string) => void;
}

const SideDock: React.FC<SideDockProps> = ({ onCharacterClick }) => {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const { isMobile } = useMobile();

  const characters: Character[] = [
    {
      id: 'edgar',
      name: 'Edgar',
      image: edgarImage,
      description: 'AI Companion',
      terminalName: 'EDGAR_01'
    }
  ];

  const handleCharacterClick = (characterId: string) => {
    if (onCharacterClick) {
      onCharacterClick(characterId);
    }
  };

  return (
    <div className={`
      ${isMobile
        ? 'mobile-side-dock fixed bottom-20 right-4 z-40'
        : 'fixed left-4 top-1/2 transform -translate-y-1/2 z-40'
      }
    `}>
      {/* CRT-Style Container */}
      <div
        className="relative font-mono"
        style={{
          background: 'rgba(5,5,15,0.9)',
          border: '2px solid rgba(0,255,255,0.3)',
          padding: '12px',
          boxShadow: '0 0 15px rgba(0,255,255,0.08), inset 0 0 30px rgba(0,255,255,0.03)'
        }}
      >
        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
            opacity: 0.4
          }}
        />

        {/* Header */}
        <div
          className="text-ed-cyan-500/80 text-[10px] tracking-wider mb-3 pb-2 border-b border-ed-cyan-500/30"
          style={{ textShadow: '0 0 5px rgba(0,255,255,0.4)' }}
        >
          ┌── EDGAR ──┐
        </div>

        {/* Characters */}
        <div className={`relative z-10 ${isMobile ? 'flex flex-row space-x-3' : 'flex flex-col space-y-3'}`}>
          {characters.map((character, index) => (
            <div
              key={character.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
              onClick={() => handleCharacterClick(character.id)}
            >
              {/* CRT Monitor Frame for Avatar */}
              <div
                className={`
                  relative overflow-hidden transition-all duration-300
                  ${isMobile ? 'w-12 h-12' : 'w-14 h-14'}
                  ${hoveredCharacter === character.id ? 'scale-110' : 'scale-100'}
                `}
                style={{
                  border: `2px solid ${hoveredCharacter === character.id ? 'rgba(0,255,255,0.7)' : 'rgba(0,255,255,0.3)'}`,
                  borderRadius: '50%',
                  background: 'rgba(5,5,20,0.8)',
                  boxShadow: hoveredCharacter === character.id
                    ? '0 0 12px rgba(0,255,255,0.35), inset 0 0 10px rgba(0,255,255,0.1)'
                    : '0 0 5px rgba(0,255,255,0.15), inset 0 0 5px rgba(0,255,255,0.05)'
                }}
              >
                {/* Character image with CRT tint */}
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  style={{
                    filter: hoveredCharacter === character.id
                      ? 'saturate(1.2) brightness(1.1)'
                      : 'saturate(0.8) brightness(0.9) sepia(0.1)',
                    mixBlendMode: 'normal'
                  }}
                />

                {/* Subtle CRT overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, transparent 30%, rgba(0,20,30,0.3) 100%)'
                  }}
                />

                {/* Scanline on avatar */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)'
                  }}
                />

                {/* Online indicator */}
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-black"
                  style={{
                    backgroundColor: '#00FF00',
                    boxShadow: '0 0 8px #00FF00',
                    animation: 'pulse-glow 2s ease-in-out infinite'
                  }}
                />
              </div>

              {/* Terminal-style tooltip */}
              {hoveredCharacter === character.id && (
                <div className={`
                  absolute z-50
                  ${isMobile
                    ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
                    : 'left-16 top-1/2 transform -translate-y-1/2'
                  }
                `}>
                  <div
                    className="font-mono text-xs px-3 py-2"
                    style={{
                      background: 'rgba(5,5,15,0.95)',
                      border: '1px solid rgba(0,255,255,0.4)',
                      boxShadow: '0 0 10px rgba(0,255,255,0.2)'
                    }}
                  >
                    <div
                      className="text-ed-cyan-400 font-bold"
                      style={{ textShadow: '0 0 5px rgba(0,255,255,0.6)' }}
                    >
                      {character.terminalName}
                    </div>
                    <div className="text-ed-cyan-500/70 text-[10px]">{character.name}</div>
                    <div className="text-gray-500 text-[9px] mt-1">
                      [{character.description}]
                    </div>
                    <div className="text-ed-cyan-500/40 text-[8px] mt-1">
                      STATUS: ONLINE
                    </div>
                  </div>
                </div>
              )}

              {/* Index number */}
              {!isMobile && (
                <div
                  className="absolute -right-1 -top-1 w-4 h-4 flex items-center justify-center text-[8px] font-bold"
                  style={{
                    background: 'rgba(5,15,20,0.9)',
                    border: '1px solid rgba(0,255,255,0.35)',
                    color: 'rgba(0,255,255,0.7)',
                    textShadow: '0 0 3px rgba(0,255,255,0.4)'
                  }}
                >
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="text-ed-cyan-500/50 text-[9px] tracking-wider mt-3 pt-2 border-t border-ed-cyan-500/30 text-center"
          style={{ textShadow: '0 0 3px rgba(0,255,255,0.2)' }}
        >
          AI Companion
        </div>
        <div
          className="text-ed-cyan-700/40 text-[8px] tracking-wider text-center"
          style={{ textShadow: '0 0 2px rgba(0,255,255,0.15)' }}
        >
          └──────────┘
        </div>
      </div>

      {/* Inline animations */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #00FF00; }
          50% { opacity: 0.7; box-shadow: 0 0 4px #00FF00; }
        }
      `}</style>
    </div>
  );
};

export default SideDock;
