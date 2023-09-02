import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import { RouterPaths } from './router-paths';
import { MainLayout } from 'layout/MainLayout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { LoginPage } from 'pages/LoginPage';
import { ProtectedRoute } from 'hocs/ProtectedRoute';
import { MainPage } from 'pages/MainPage';
import { NotePage } from 'pages/NotePage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path={RouterPaths.MAIN} element={<MainPage />} />
        <Route path={`${RouterPaths.NOTES}/:id`} element={<NotePage />} />
      </Route>

      <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
