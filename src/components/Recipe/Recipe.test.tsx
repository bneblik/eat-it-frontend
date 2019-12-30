import React from 'react';
import { shallow } from 'enzyme';
import { Recipe } from './Recipe.component';

describe('Recipe', () => {
  it('renders without crashing', () => {
    shallow(<Recipe />);
  });
});
