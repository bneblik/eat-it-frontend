import React from 'react';
import { shallow } from 'enzyme';
import { ShoppingList } from './ShoppingList.component';

describe('ShoppingList', () => {
  it('renders without crashing', () => {
    shallow(<ShoppingList />);
  });
});
