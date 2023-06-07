import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import zhHkJSON from './locales/zh-hk.json';
import App from './App';
import './index.css';
import { store, useAppSelector } from './state';
import Updater from './updater';
import { Language } from './interfaces/language';

// i18n.use(initReactI18next)
//   .use(LanguageDetector)
//   .init({
//     resources: {
//       zhHK: {
//         translation: zhHkJSON,
//       },
//       en: {},
//     },
//     lng: localStorage.getItem('LANGUAGE') ?? 'en',
//     fallbackLng: 'en',
//     debug: false,
//     interpolation: {
//       escapeValue: false,
//     },
//   });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function I18nProvider({ children }: { children: React.ReactNode }) {
  const lan = useAppSelector((state) => state.app.language);
  return (
    <IntlProvider locale={lan ?? 'en'} messages={lan === Language.HK ? zhHkJSON : {}}>
      {children}
    </IntlProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <Updater />
          <App />
        </QueryClientProvider>
      </I18nProvider>
    </Provider>
  </BrowserRouter>,
);
