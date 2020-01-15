import React from 'react';
import { shallow } from 'enzyme';
import Meals from './Meals.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('Meals', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <Meals />
      </Provider>
    );
  });
});
