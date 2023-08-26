import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App.tsx';
import { AuthProvider } from 'context/authProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AuthProvider>
  </React.StrictMode>
);
