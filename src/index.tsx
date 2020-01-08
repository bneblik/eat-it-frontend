import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import './styles/css/index.styles.css';
import { store } from './store/store';
import catalogPl from './locales/pl/messages';
import catalogEn from './locales/en/messages';
import { setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { BrowserRouter, Route } from 'react-router-dom';
const catalogs = {
  pl: catalogPl,
  en: catalogEn
};

export const i18n = setupI18n({ catalogs: catalogs });
i18n.activate('pl');
const LANG_PATH = '/:lng(en|pl)?';

render(
  <Provider store={store}>
    <I18nProvider i18n={i18n} language="pl">
      <BrowserRouter>
        <Route path={LANG_PATH} render={() => <App />} />
      </BrowserRouter>
    </I18nProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});
