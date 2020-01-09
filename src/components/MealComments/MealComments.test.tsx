import React from 'react';
import { shallow } from 'enzyme';
import { MealComments } from './MealComments.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('MealComments', () => {
  it('renders without crashing', () => {
    shallow(<MealComments />);
  });
});
