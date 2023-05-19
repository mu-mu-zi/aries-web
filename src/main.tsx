import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import App from './App';
import './index.css';
import { store } from './state';
import Dashboard from './pages/Trust/Dashboard';
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
import Trust from './pages/Trust';
import AssetTransfet from './pages/Trust/AssetTransfet';
import InvestmentOrder from './pages/Trust/InvestmentOrder';
import OrderDetail from './pages/Trust/InvestmentOrder/OrderDetail';
import Distribution from './pages/Trust/Distribution';
import Elements from './pages/Trust/Elements';
import BillAndResources from './pages/Trust/BillAndResources';
import Security from './pages/Security';
import LoginLog from './pages/Security/LoginLog';
import Updater from './updater';
import Notification from './pages/Trust/Dashboard/Notification';
import ChangeMobile from './pages/Security/ChangeMobile';
import ChangeEmail from './pages/Security/ChangeEmail';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/',
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
            path: '/first/:trustId',
            children: [
              {
                path: '',
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
          {
            path: '/personal',
            children: [
              {
                path: '',
                element: <Security />,
              },
              {
                path: 'changeMobile',
                element: <ChangeMobile />,
              },
              {
                path: 'changeEmail',
                element: <ChangeEmail />,
              },
            ],
          },
          {
            path: '/loginLog',
            element: <LoginLog />,
          },
        ],
      },
      {
        path: '/trust/:trustId',
        element: <Trust />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'notification',
            element: <Notification />,
          },
          {
            path: 'assets',
            element: <AssetTransfet />,
          },
          {
            path: 'orders',
            children: [
              {
                path: '',
                element: <InvestmentOrder />,
              },
              {
                path: 'detail',
                element: <OrderDetail />,
              },
            ],
          },
          {
            path: 'distribution',
            children: [
              {
                path: '',
                element: <Distribution />,
              },
            ],
          },
          {
            path: 'elements',
            children: [
              {
                path: '',
                element: <Elements />,
              },
            ],
          },
          {
            path: 'billAndResources',
            children: [
              {
                path: '',
                element: <BillAndResources />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

i18n.use(initReactI18next)
  .init({
    resources: {
      zhTW: {
        translation: {},
      },
      en: {
        translation: {},
      },
    },
    lng: localStorage.getItem('LANGUAGE') ?? 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Updater />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
