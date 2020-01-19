import React from 'react';
import { shallow } from 'enzyme';
import AddProduct from './AddProduct.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('AddProduct', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <AddProduct buttonName="" />
      </Provider>
    );
  });
});
