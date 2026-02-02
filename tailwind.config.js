/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Electric Dreams 1984 Color Palette - Green Phosphor CRT
      colors: {
        // Green Phosphor - Primary (Authentic 1984 CRT)
        'ed-green': {
          50: '#F0FFF0',
          100: '#E0FFE0',
          200: '#B0FFB0',
          300: '#66FF66',
          400: '#33FF33',
          500: '#00FF00',  // Classic phosphor green
          600: '#00DD00',
          700: '#00BB00',
          800: '#009900',
          900: '#006600',
          950: '#003300',
        },
        // CRT Cyan - Secondary
        'ed-cyan': {
          50: '#F0FFFF',
          100: '#E0FFFF',
          200: '#B0FFFF',
          300: '#7FFFFF',
          400: '#40FFFF',
          500: '#00FFFF',
          600: '#00CCCC',
          700: '#00B8B8',
          800: '#008888',
          900: '#006666',
          950: '#004444',
        },
        // Amber Phosphor - For warnings/highlights
        'ed-amber': {
          50: '#FFFBF0',
          100: '#FFF4E0',
          200: '#FFE8C0',
          300: '#FFD080',
          400: '#FFC040',
          500: '#FFB000',
          600: '#DD9900',
          700: '#CC8800',
          800: '#996600',
          900: '#664400',
          950: '#442200',
        },
        // Magenta - Accent
        'ed-magenta': {
          50: '#FFF0FF',
          100: '#FFE0FF',
          200: '#FFC0FF',
          300: '#FF80FF',
          400: '#FF40FF',
          500: '#FF00FF',
          600: '#DD00DD',
          700: '#B800B8',
          800: '#880088',
          900: '#660066',
          950: '#440044',
        },
        // Terminal Black Backgrounds (1984 CRT)
        'ed-bg': {
          'primary': '#000000',      // Pure black
          'secondary': '#0A0A0A',    // Slight gray
          'surface': '#050805',      // Dark with green tint
          'elevated': '#0A100A',     // Elevated with green tint
          'card': '#080C08',         // Card background
          'terminal': '#000800',     // Terminal green tint
        },
        // Phosphor Text Colors
        'ed-text': {
          'primary': '#00FF00',      // Green phosphor
          'secondary': '#00CC00',    // Dimmer green
          'muted': '#006600',        // Very dim green
          'amber': '#FFB000',        // Amber for highlights
          'white': '#FFFFFF',        // Pure white (rare use)
        },
      },
      // Electric Dreams Typography
      fontFamily: {
        'terminal': ['VT323', 'Courier New', 'monospace'],
        'pixel': ['"Press Start 2P"', 'cursive'],
        'mono': ['"Space Mono"', 'Courier New', 'monospace'],
        'display': ['"Orbitron"', 'sans-serif'],
      },
      // Custom Animations
      animation: {
        'ed-scanline': 'ed-scanline 8s linear infinite',
        'ed-phosphor': 'ed-phosphor-glow 2s ease-in-out infinite',
        'ed-vhs-track': 'ed-vhs-tracking 0.5s steps(4) infinite',
        'ed-crt-flicker': 'ed-crt-flicker 0.15s infinite',
        'ed-neon-pulse': 'ed-neon-pulse 2s ease-in-out infinite',
        'ed-grid-flow': 'ed-grid-flow 20s linear infinite',
        'ed-typing': 'ed-typing 1s steps(1) infinite',
        'ed-boot': 'ed-boot 0.5s ease-out forwards',
        'ed-glow': 'ed-glow 2s ease-in-out infinite',
        'ed-float': 'ed-float 6s ease-in-out infinite',
      },
      keyframes: {
        'ed-scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'ed-phosphor-glow': {
          '0%, 100%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
          },
          '50%': {
            textShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 10px currentColor',
          },
        },
        'ed-vhs-tracking': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-2px)' },
          '20%': { transform: 'translateX(2px)' },
          '30%': { transform: 'translateX(-1px)' },
        },
        'ed-crt-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.98' },
        },
        'ed-neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor',
            opacity: '1',
          },
          '50%': {
            boxShadow: '0 0 20px currentColor, 0 0 40px currentColor',
            opacity: '0.9',
          },
        },
        'ed-grid-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100px' },
        },
        'ed-typing': {
          '0%, 50%': { borderColor: 'currentColor' },
          '51%, 100%': { borderColor: 'transparent' },
        },
        'ed-boot': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'ed-glow': {
          '0%, 100%': { filter: 'brightness(1) drop-shadow(0 0 5px currentColor)' },
          '50%': { filter: 'brightness(1.2) drop-shadow(0 0 15px currentColor)' },
        },
        'ed-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      // Custom Box Shadows - Green Phosphor Glow
      boxShadow: {
        'ed-green': '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00',
        'ed-cyan': '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
        'ed-amber': '0 0 10px #FFB000, 0 0 20px #FFB000, 0 0 30px #FFB000',
        'ed-magenta': '0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF',
        'ed-glow-sm': '0 0 5px currentColor',
        'ed-glow-md': '0 0 10px currentColor, 0 0 20px currentColor',
        'ed-glow-lg': '0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor',
        'ed-inset': 'inset 0 0 60px rgba(0, 255, 0, 0.1), inset 0 0 100px rgba(0, 0, 0, 0.8)',
        'ed-phosphor': '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 20px #00CC00, 0 0 40px #009900',
        'ed-crt': 'inset 0 0 100px rgba(0, 255, 0, 0.05), inset 0 0 200px rgba(0, 0, 0, 0.5)',
      },
      // CRT Border Radius
      borderRadius: {
        'crt': '20px 20px 20px 20px / 15px 15px 15px 15px',
      },
      // Background Images - 1984 Terminal Effects
      backgroundImage: {
        'ed-grid': `
          linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
        `,
        'ed-scanlines': `repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 2px,
          rgba(0, 255, 0, 0.03) 2px,
          rgba(0, 255, 0, 0.03) 4px
        )`,
        'ed-crt-curve': 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        'ed-terminal': 'radial-gradient(ellipse at center, #000800 0%, #000000 100%)',
        'ed-data-stream': `repeating-linear-gradient(
          180deg,
          transparent 0px,
          rgba(0, 255, 0, 0.1) 2px,
          transparent 4px
        )`,
      },
      backgroundSize: {
        'ed-grid': '50px 50px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
