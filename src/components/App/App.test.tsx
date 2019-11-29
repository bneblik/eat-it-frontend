import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
