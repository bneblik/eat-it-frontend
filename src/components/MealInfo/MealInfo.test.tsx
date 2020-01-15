import React from 'react';
import { shallow } from 'enzyme';
import { MealInfo } from './MealInfo.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('MealInfo', () => {
  it('renders without crashing', () => {
    shallow(<MealInfo meal={{}} />);
  });
});
