import React from 'react';
import { shallow } from 'enzyme';
import ShoppingList from './ShoppingList.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('ShoppingList', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ShoppingList />
      </Provider>
    );
  });
});
