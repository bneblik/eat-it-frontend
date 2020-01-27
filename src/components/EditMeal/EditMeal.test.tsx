import React from 'react';
import { shallow } from 'enzyme';
import { EditMeal } from './EditMeal.component';
import { TMeal } from '../../types/MealTypes';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;

describe('EditMeal', () => {
  beforeEach(() => {
    const props = { mealToEdit: {} as TMeal };
    wrapper = shallow(<EditMeal {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
