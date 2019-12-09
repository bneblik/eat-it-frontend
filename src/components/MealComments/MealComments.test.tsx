import React from 'react';
import { shallow } from 'enzyme';
import { MealComments } from './MealComments.component';

describe('MealComments', () => {
  it('renders without crashing', () => {
    shallow(<MealComments />);
  });
});
