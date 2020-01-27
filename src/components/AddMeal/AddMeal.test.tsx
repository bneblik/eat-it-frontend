import React from 'react';
import { shallow } from 'enzyme';
import { AddMeal } from './AddMeal.component';
jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;

describe('AddMeal', () => {
  beforeEach(() => {
    const props = {
      productsList: [],
      addMeal: () => {
        return {} as any;
      },
      clearAddMealError: jest.fn(),
      clearAddMealSuccess: jest.fn(),
      error: null,
      success: null,
      pending: false
    };
    wrapper = shallow(<AddMeal {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders empty form', () => {
    // given
    // when
    const name = wrapper.find('#name').props().value;
    const description = wrapper.find('#description').props().value;
    const prepTime = wrapper.find('#prepTime').props().value;
    const category = wrapper.find('#category').props().value;
    const video = wrapper.find('#video').props().value;
    // then
    expect(name).toEqual('');
    expect(description).toEqual('');
    expect(prepTime).toEqual('');
    expect(category).toEqual('');
    expect(video).toEqual('');
  });

  it('updates on change', () => {
    // given
    const exampleName = 'example meal name';
    const nameInput = wrapper.find('#name');
    // when
    nameInput.simulate('change', { target: { value: exampleName } });
    wrapper.update();
    const name = wrapper.find('#name').props().value;
    // then
    expect(name).toEqual(exampleName);
  });
  it('updates on change', () => {
    // given
    const userInput = {
      name: 'example name',
      recipe: ['step', 'step 2'],
      description: 'example description',
      prepareTime: '1 hour',
      category: 'breakfast',
      video: 'asdfghj',
      ingredients: []
    };
    const spy = jest.spyOn(component, 'add');
    component.setState(userInput);
    // when
    wrapper.update();
    const button = wrapper.find('.save');
    button.simulate('click');
    // then
    expect(spy).toHaveBeenCalled();
  });
});
