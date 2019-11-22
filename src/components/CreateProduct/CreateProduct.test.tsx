import React from 'react';
import { shallow } from 'enzyme';
import { CreateProduct } from './CreateProduct.component';

describe('AddMeal', () => {
  it('renders without crashing', () => {
    shallow(<CreateProduct />);
  });
});
