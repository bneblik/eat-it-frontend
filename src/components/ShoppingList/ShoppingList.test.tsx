import React from 'react';
import { shallow } from 'enzyme';
import { ShoppingList } from './ShoppingList.component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

let wrapper: any;
let component: any;

describe('ShoppingList', () => {
  beforeEach(() => {
    const props = {
      productsCategories: [],
      fetchMyShoppingList: jest.fn(),
      addToBasket: jest.fn(),
      changeAmount: jest.fn(),
      removeProduct: jest.fn(),
      saveShoppingList: jest.fn(),
      addProduct: jest.fn()
    };
    wrapper = shallow(<ShoppingList {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
