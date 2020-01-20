import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('SignUp', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
  });
});
