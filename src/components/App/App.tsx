import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { useLocaStorage } from 'src/utils/useLocalStorage';

export function App({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useLocaStorage<ColorScheme>('appTheme','light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
