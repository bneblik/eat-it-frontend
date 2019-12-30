import React from 'react';
import { shallow } from 'enzyme';
import MyMeals from './MyMeals.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('MyMeals', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <MyMeals />
      </Provider>
    );
  });
});
