import React from 'react';
import { shallow } from 'enzyme';
import { Meal } from './Meal.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('Meal', () => {
  it('should display text', () => {
    const meal = shallow(<Meal match={{ params: { id: '5' } }} />);
    expect(meal.text()).toContain('Cannot find element with id = 5');
  });
});
