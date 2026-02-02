import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface UISettings {
  particleEffects: boolean;
  animations: boolean;
  blurEffects: boolean;
  performanceMode: boolean;
  particleDensity: number;
  animationSpeed: number;
  lightMode: number;
  darkMode: number;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  uiSettings: UISettings;
  setUiSettings: (settings: UISettings) => void;
}

// Electric Dreams 1984 Default Theme - Green Phosphor CRT
const defaultTheme: Theme = {
  id: 'omnia',
  name: "Omnia's Dream",
  primary: 'from-ed-green-500 to-ed-green-700',
  secondary: 'from-ed-bg-secondary to-ed-bg-primary',
  accent: 'text-ed-green-400',
  background: 'from-ed-bg-primary to-black'
};

const defaultSettings: UISettings = {
  particleEffects: true,
  animations: true,
  blurEffects: true,
  performanceMode: false,
  particleDensity: 50,
  animationSpeed: 50,
  lightMode: 50,
  darkMode: 50
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  uiSettings: defaultSettings,
  setUiSettings: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [uiSettings, setUiSettings] = useState<UISettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved settings
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('omniaos-theme');
      const savedSettings = localStorage.getItem('omniaos-settings');

      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        // Force update to Electric Dreams theme if using old pink/red themes
        if (parsedTheme.primary.includes('pink') || parsedTheme.primary.includes('red')) {
          setTheme(defaultTheme);
        } else {
          setTheme(parsedTheme);
        }
      }
      if (savedSettings) {
        setUiSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading saved settings:', error);
    }
    setIsInitialized(true);
  }, []);

  // Apply theme and settings changes
  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    const body = document.body;

    // Apply Electric Dreams 1984 theme colors - Green Phosphor
    root.style.setProperty('--tw-gradient-from', `rgb(0 255 0)`); // green-500
    root.style.setProperty('--tw-gradient-to', `rgb(0 187 0)`); // green-700
    root.style.setProperty('--accent-color', 'rgb(0 255 0)'); // green-500

    // Electric Dreams 1984 specific variables
    root.style.setProperty('--ed-primary', '#00FF00');
    root.style.setProperty('--ed-secondary', '#FFB000');
    root.style.setProperty('--ed-accent', '#00FF00');
    root.style.setProperty('--ed-bg', '#000000');

    // Apply UI settings
    root.style.setProperty('--animation-speed', `${uiSettings.animationSpeed}%`);
    root.style.setProperty('--particle-density', `${uiSettings.particleDensity}`);
    root.style.setProperty('--blur-amount', uiSettings.blurEffects ? '1' : '0');

    // Apply light/dark mode
    const brightness = ((uiSettings.lightMode + (100 - uiSettings.darkMode)) / 100) + 0.3;
    root.style.setProperty('--brightness', brightness.toString());

    // Toggle classes based on settings
    body.classList.toggle('reduce-animations', !uiSettings.animations);
    body.classList.toggle('performance-mode', uiSettings.performanceMode);
    body.classList.toggle('no-particles', !uiSettings.particleEffects);

    // Save settings
    localStorage.setItem('omniaos-theme', JSON.stringify(theme));
    localStorage.setItem('omniaos-settings', JSON.stringify(uiSettings));
  }, [theme, uiSettings, isInitialized]);

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, uiSettings, setUiSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Electric Dreams 1984 Theme Collection
export const themes: Theme[] = [
  defaultTheme,
  {
    id: 'amber',
    name: 'Amber Terminal',
    primary: 'from-ed-amber-500 to-ed-amber-700',
    secondary: 'from-ed-amber-950 to-ed-bg-primary',
    accent: 'text-ed-amber-400',
    background: 'from-ed-bg-primary to-black'
  },
  {
    id: 'cyan',
    name: 'Cyan CRT',
    primary: 'from-ed-cyan-500 to-ed-cyan-700',
    secondary: 'from-ed-cyan-950 to-ed-bg-primary',
    accent: 'text-ed-cyan-400',
    background: 'from-ed-bg-primary to-black'
  },
  {
    id: 'magenta',
    name: 'Magenta Dreams',
    primary: 'from-ed-magenta-500 to-ed-magenta-700',
    secondary: 'from-ed-magenta-900 to-ed-bg-primary',
    accent: 'text-ed-magenta-400',
    background: 'from-ed-bg-secondary to-black'
  }
];
