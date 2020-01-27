import React from 'react';
import { shallow } from 'enzyme';
import { AddProduct } from './AddProduct.component';
import { ProductType } from '../../types/Products';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;
let mockAdd: any;

const product1: ProductType = {
  id: 1,
  name: 'product1',
  calories: 1,
  proteins: 2,
  unit: 'g',
  carbs: 3,
  fats: 4,
  category: 'x'
};
const product2: ProductType = {
  id: 2,
  name: 'product2',
  unit: 'g',
  calories: 155,
  proteins: 78,
  carbs: 83,
  fats: 34,
  category: 'y'
};

describe('AddProduct', () => {
  beforeEach(() => {
    mockAdd = jest.fn();
    const props = {
      buttonName: 'button',
      productsList: [product1, product2],
      addProduct: mockAdd
    };
    wrapper = shallow(<AddProduct {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('should display options', () => {
    const options = wrapper.find('#name').props().options;
    expect(options).toEqual([product1, product2]);
  });

  it('should display info about selected product', () => {
    // given
    let select = wrapper.find('#name');
    // when
    select.simulate('change', {}, product1);
    wrapper.update();
    select = wrapper.find('#name').props().value;
    const kcal = wrapper.find('#calories').props().value;
    const prot = wrapper.find('#proteins').props().value;
    const carbs = wrapper.find('#carbs').props().value;
    const fats = wrapper.find('#fats').props().value;
    // then
    expect(select.name).toEqual(product1.name);
    expect(kcal).toEqual(product1.calories);
    expect(prot).toEqual(product1.proteins);
    expect(carbs).toEqual(product1.carbs);
    expect(fats).toEqual(product1.fats);
  });

  it('should save changes and close dialog', () => {
    const saveButton = wrapper.find('#save');
    saveButton.simulate('click');
    expect(mockAdd).toHaveBeenCalled();
    expect(component.state.dialogOpened).toBeFalsy();
  });
  it('should only close dialog', () => {
    const cancelButton = wrapper.find('#cancel');
    cancelButton.simulate('click');
    expect(mockAdd).toBeCalledTimes(0);
    expect(component.state.dialogOpened).toBeFalsy();
  });
});
