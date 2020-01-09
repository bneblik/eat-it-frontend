import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import AllMeals from '../AllMeals/AllMeals.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('AllMeals', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <AllMeals history={{ location: { search: '' } } as any} />
      </Provider>
    );
  });
});
