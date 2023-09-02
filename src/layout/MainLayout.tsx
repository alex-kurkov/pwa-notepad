import { useState } from 'react';
import { AppShell, Footer } from '@mantine/core';
import { AppHeader } from 'components/AppHeader';
import { Navigation } from 'components/Navigation';
import { ErrorBoundary } from 'hocs/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'context/authProvider';

export function MainLayout() {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={<AppHeader opened={opened} setOpened={setOpened} />}
        navbar={
          <>{user && <Navigation opened={opened} setOpened={setOpened} />}</>
        }
        footer={
          <Footer height={60} p="md">
            {new Date().getFullYear()} Alex Kurkov
          </Footer>
        }
      >
        <Outlet />
      </AppShell>
    </ErrorBoundary>
  );
}
