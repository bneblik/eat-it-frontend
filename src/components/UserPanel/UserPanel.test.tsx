import React from 'react';
import { shallow } from 'enzyme';
import UserPanel from './UserPanel.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('UserPanel', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <UserPanel />
      </Provider>
    );
  });
});
