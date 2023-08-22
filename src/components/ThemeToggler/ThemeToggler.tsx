import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '../Icon';

export function ThemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" my={30}>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<IconSun color={theme.white} />}
        offLabel={
          <IconMoon color={theme.colors.gray[6]} />
        }
      />
    </Group>
  );
}
