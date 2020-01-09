import React from 'react';
import { shallow } from 'enzyme';
import { Recipe } from './Recipe.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('Recipe', () => {
  it('renders without crashing', () => {
    shallow(<Recipe />);
  });
});
