import React from 'react';
import { shallow } from 'enzyme';
import { AddProduct } from './AddProduct.component';

describe('AddProduct', () => {
  it('renders without crashing', () => {
    shallow(<AddProduct buttonName="" />);
  });
});
