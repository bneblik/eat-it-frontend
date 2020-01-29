import React from 'react';
import { shallow } from 'enzyme';
import { MealComments } from './MealComments.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;

describe('MealComments', () => {
  beforeEach(() => {
    const props = {
      error: null,
      success: null,
      pending: false,
      comments: [],
      last: false,
      mealId: 1,
      page: 1,
      addMealComment: jest.fn(),
      fetchComments: jest.fn(),
      removeComment: jest.fn(),
      clearMealCommentsErrors: jest.fn(),
      clearMealCommentsSuccess: jest.fn()
    };
    wrapper = shallow(<MealComments {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
