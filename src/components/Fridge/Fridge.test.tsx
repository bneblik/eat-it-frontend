import React from 'react';
import { shallow } from 'enzyme';
import { Fridge } from './Fridge.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

let wrapper: any;
let component: any;

describe('Fridge', () => {
  beforeEach(() => {
    const props = {
      productsCategories: [],
      fetchMyFridge: jest.fn(),
      addToBasket: jest.fn(),
      changeAmount: jest.fn(),
      removeProduct: jest.fn(),
      saveFridge: jest.fn(),
      addProduct: jest.fn()
    };
    wrapper = shallow(<Fridge {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
