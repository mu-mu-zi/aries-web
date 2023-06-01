import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter, createBrowserRouter, redirect, RouterProvider,
} from 'react-router-dom';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhHkJSON from './locales/zh-hk.json';
import App from './App';
import './index.css';
import { store } from './state';
import Updater from './updater';

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      zhHK: {
        translation: zhHkJSON,
      },
      en: {},
    },
    lng: localStorage.getItem('LANGUAGE') ?? 'en',
    fallbackLng: 'en',
    debug: false,
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
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Updater />
        <App />
        {/* <RouterProvider router={router} /> */}
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>,
);
