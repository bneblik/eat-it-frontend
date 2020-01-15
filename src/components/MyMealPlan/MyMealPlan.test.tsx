import React from 'react';
import { shallow } from 'enzyme';
import { MyMealPlan } from './MyMealPlan.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('MyMealPlan', () => {
  it('renders without crashing', () => {
    shallow(<MyMealPlan />);
  });
});
