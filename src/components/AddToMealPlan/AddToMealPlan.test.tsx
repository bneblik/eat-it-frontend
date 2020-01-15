import React from 'react';
import { shallow } from 'enzyme';
import { AddToMealPlan } from './AddToMealPlan.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('AddToMealPlan', () => {
  it('renders without crashing', () => {
    shallow(<AddToMealPlan />);
  });
});
