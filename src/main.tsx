import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './state';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Welcome from './pages/SignIn/Welcome';
import SignIn from './pages/SignIn/SignIn';
import GAGuide from './pages/SignIn/GAGuide';
import GAScanBind from './pages/SignIn/GAScanBind';
import GABackupKey from './pages/SignIn/GABackupKey';
import GABindVerify from './pages/SignIn/GABindVerify';
import Status from './views/Status';
import GAVerify from './pages/SignIn/GAVerify';
import ContactCustomer from './views/ContactCustomer';
import FirstGuideWelcome from './pages/FirstGuide/FirstGuideWelcome';
import KycVerify from './pages/FirstGuide/KycVerify';
import MyTrust from './pages/MyTrust';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/welcome',
            element: <Welcome />,
          },
          {
            path: '/signIn',
            element: <SignIn />,
          },
          {
            path: '/gaGuide',
            element: <GAGuide />,
          },
          {
            path: '/gaBind',
            element: <GAScanBind />,
          },
          {
            path: '/gaBackup',
            element: <GABackupKey />,
          },
          {
            path: '/gaBindVerify',
            element: <GABindVerify />,
          },
          {
            path: '/gaVerify',
            element: <GAVerify />,
          },
          {
            path: '/status',
            element: <Status />,
          },
          {
            path: '/contactCustomer',
            element: <ContactCustomer />,
          },
          {
            path: '/first',
            children: [
              {
                path: 'welcome',
                element: <FirstGuideWelcome />,
              },
              {
                path: 'KycVerify',
                element: <KycVerify />,
              },
            ],
          },
          {
            path: '/my',
            element: <MyTrust />,
          },
        ],
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
