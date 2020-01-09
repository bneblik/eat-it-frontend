import React from 'react';
import { shallow } from 'enzyme';
import MyMeals from './MyMeals.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('MyMeals', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <MyMeals />
      </Provider>
    );
  });
});
