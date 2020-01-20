import React from 'react';
import { shallow } from 'enzyme';
import LogIn from './LogIn.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('LogIn', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
  });
});
