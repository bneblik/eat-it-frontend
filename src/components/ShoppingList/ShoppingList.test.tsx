import React from 'react';
import { shallow } from 'enzyme';
import { ShoppingList } from './ShoppingList.component';
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
      addProduct: jest.fn(),
      error: null,
      pending: false,
      success: null,
      clearShoppingListSuccess: jest.fn(),
      clearShoppingListError: jest.fn()
    };
    wrapper = shallow(<ShoppingList {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
