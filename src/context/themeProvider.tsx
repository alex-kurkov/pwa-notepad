import React, {
  createContext,
  useContext,
  useState,
} from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextInterface {
  theme: ThemeType;
  toggleTheme: () => void;
}

const INIT_THEME = 'dark';

const ThemeContext = createContext<ThemeContextInterface>({
  theme: 'dark',
  toggleTheme() {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(INIT_THEME);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
