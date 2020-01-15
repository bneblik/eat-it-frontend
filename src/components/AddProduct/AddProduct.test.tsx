import React from 'react';
import { shallow } from 'enzyme';
import AddProduct from './AddProduct.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('AddProduct', () => {
  it('renders without crashing', () => {
    shallow(<AddProduct buttonName="" />);
  });
});
