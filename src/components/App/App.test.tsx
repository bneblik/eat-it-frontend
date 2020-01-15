import React from 'react';
import { shallow } from 'enzyme';
import { ConnectedApp } from './App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return {};
  }
}));

describe('App', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ConnectedApp match={{ url: '', params: { lng: 'en' } }} history={{}} location={{}} />
      </Provider>
    );
  });
});
