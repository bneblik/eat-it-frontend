import React from 'react';
import { shallow } from 'enzyme';
import AllMeals from './AllMeals.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('AllMeals', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <AllMeals />
      </Provider>
    );
  });
});
