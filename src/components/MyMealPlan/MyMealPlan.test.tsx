import React from 'react';
import { shallow } from 'enzyme';
import MyMealPlan from './MyMealPlan.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('MyMealPlan', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <MyMealPlan />
      </Provider>
    );
  });
});
