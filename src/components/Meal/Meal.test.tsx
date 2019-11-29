import React from 'react';
import { shallow } from 'enzyme';
import { Meal } from './Meal.component';

describe('Meal', () => {
  it('should display text', () => {
    const meal = shallow(<Meal mealsList={[]} match={{ params: { id: '5' } }} />);
    expect(meal.text()).toContain('Cannot find element with id = 5');
  });
});
