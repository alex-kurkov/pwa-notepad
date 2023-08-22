import {
  MantineProvider,
  Text,
  Flex,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import M from './M';
import { useState } from 'react';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
        <Flex h="100vh" w="100%" align="center" justify="center">
          <Text>Welcome to Mantine!</Text>
          <M />
        </Flex>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
