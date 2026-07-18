/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const isTheme = (value: string | undefined | null): value is Theme =>
  value === 'dark' || value === 'light';

const resolveTheme = (): Theme => {
  const documentTheme = document.documentElement.dataset.theme;
  if (isTheme(documentTheme)) return documentTheme;

  try {
    const storedTheme = localStorage.getItem('theme');
    if (isTheme(storedTheme)) return storedTheme;
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  themeColor?.setAttribute('content', theme === 'light' ? '#f1efe7' : '#050606');
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Keep the server and first client render identical. The pre-paint head script
  // already applies the saved theme to <html>; this state synchronizes after mount.
  const [theme, setTheme] = useState<Theme>('dark');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(resolveTheme());
      setInitialized(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // The visual theme still works when persistence is unavailable.
    }
  }, [initialized, theme]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'theme' && isTheme(event.newValue)) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (
        current === 'dark' ? 'light' : 'dark'
      )),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
};
