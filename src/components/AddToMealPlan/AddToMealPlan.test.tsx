import React from 'react';
import { shallow } from 'enzyme';
import { AddToMealPlan } from './AddToMealPlan.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;

describe('AddToMealPlan', () => {
  beforeEach(() => {
    const props = {
      mealName: 'meal',
      success: null,
      error: null,
      pending: false,
      addToMealPlan: jest.fn(),
      clearMealPlanSuccess: jest.fn(),
      clearMealPlanError: jest.fn(),
      mealId: 1
    };
    wrapper = shallow(<AddToMealPlan {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
