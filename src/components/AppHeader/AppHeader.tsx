import {
  Header,
  Title,
  MediaQuery,
  Burger,
  useMantineTheme,
  Flex,
  Button,
} from '@mantine/core';
import { IconLogout } from 'components/Icon';
import { ThemeToggler } from 'components/ThemeToggler';
import { useAuth } from 'context/authProvider';
import { FC, Dispatch, SetStateAction } from 'react';

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const AppHeader: FC<Props> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  const { user, logout } = useAuth();

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Flex gap="md" align="center" justify="space-between" h="100%">
        <MediaQuery
          query="(max-width: 767px)"
          styles={{
            fontSize: '16px',
            gap: '2px',
          }}
        >
          <Title size="24" order={1} w="min-content">
            Notepad
          </Title>
        </MediaQuery>
        <Flex gap="xs" align="center" justify="flex-end">
          {user && (
            <Button
              onClick={() => logout()}
              radius="xl"
              size="xs"
              leftIcon={<IconLogout color="white" />}
              variant="filled"
            >
              {user.length > 8 ? user.slice(0, 6) + '...' : user}
            </Button>
          )}
          <ThemeToggler />
          {user && (
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="md"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          )}
        </Flex>
      </Flex>
    </Header>
  );
};
