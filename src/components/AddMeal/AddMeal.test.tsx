import React from 'react';
import { shallow } from 'enzyme';
import AddMeal from './AddMeal.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('AddMeal', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <AddMeal />
      </Provider>
    );
  });
});
