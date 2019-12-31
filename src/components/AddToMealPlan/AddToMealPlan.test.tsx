import React from 'react';
import { shallow } from 'enzyme';
import { AddToMealPlan } from './AddToMealPlan.component';

describe('AddToMealPlan', () => {
  it('renders without crashing', () => {
    shallow(<AddToMealPlan />);
  });
});
