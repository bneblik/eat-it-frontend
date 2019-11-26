import React from 'react';
import { shallow } from 'enzyme';
import { MyMealPlan } from './MyMealPlan.component';

describe('MyMealPlan', () => {
  it('renders without crashing', () => {
    shallow(<MyMealPlan />);
  });
});
