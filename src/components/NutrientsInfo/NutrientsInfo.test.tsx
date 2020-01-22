import React from 'react';
import { shallow } from 'enzyme';
import { NutrientsInfo } from './NutrientsInfo.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

let wrapper: any;
let component: any;
let props: any;

describe('NutrientsInfo', () => {
  beforeEach(() => {
    props = {
      kcal: 102,
      fats: 11,
      carbs: 102,
      proteins: 103
    };
    wrapper = shallow(<NutrientsInfo {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
  it('displays correct information', () => {
    // given
    const carbs = wrapper.find('#carbs');
    const proteins = wrapper.find('#proteins');
    const fats = wrapper.find('#fats');
    const calories = wrapper.find('.calories');
    // when
    // then
    expect(carbs.text()).toEqual(`${props.carbs} g`);
    expect(proteins.text()).toEqual(`${props.proteins} g`);
    expect(fats.text()).toEqual(`${props.fats} g`);
    expect(calories.text()).toEqual(`${props.kcal} kcal`);
  });
});
