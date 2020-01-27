import React from 'react';
import { shallow } from 'enzyme';
import { AllMeals } from '../AllMeals/AllMeals.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

let wrapper: any;
let component: any;
let mockFetch: any;

describe('AllMeals', () => {
  beforeEach(() => {
    mockFetch = jest.fn();
    const props = {
      error: null,
      meals: [],
      pending: false,
      fetchMeals: mockFetch,
      clearMealsErrors: jest.fn(),
      history: { location: {} } as any,
      last: false,
      page: 1
    };
    wrapper = shallow(<AllMeals {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch meals', () => {
    expect(mockFetch).toHaveBeenCalled();
  });

  it('should display error alert', () => {
    const errorMessage = 'example error message';
    wrapper.setProps({ error: errorMessage });
    wrapper.update();
    expect(wrapper.find('#alert').text()).toEqual(errorMessage);
  });
});
