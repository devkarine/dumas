import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { dark, light } from '../../themes';
import secureLocalStorage from 'react-secure-storage';

export type ThemeVariations = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeVariations;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProviderContext = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeVariations>('light');
  const [activeTheme, setActiveTheme] = useState<DefaultTheme>(light);

  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    secureLocalStorage.setItem('theme', newTheme);
    setActiveTheme(prev => (prev === light ? dark : light));
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const storedTheme = secureLocalStorage.getItem('theme');
    if (storedTheme) {
      console.log(storedTheme);
      setTheme(storedTheme as ThemeVariations);
      setActiveTheme(storedTheme === 'light' ? light : dark);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'This hook needs to be called within the AuthContextProvider'
    );
  }

  return { ...context };
};
