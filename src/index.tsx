import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import './styles/css/index.styles.css';
import { store } from './store/store';
import { setupI18n } from '@lingui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { catalogs, defaultLang } from './utils/LanguageService';
import { render } from 'react-dom';

export const i18n = setupI18n({ catalogs: catalogs });

i18n.activate(defaultLang);

const LANG_PATH = `/:lng(${i18n.availableLanguages.join('|')})?`;

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path={LANG_PATH} render={() => <App />} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
