import React from 'react';
import { shallow } from 'enzyme';
import { Rating } from './Rating.component';

describe('MealInfo', () => {
  it('renders without crashing', () => {
    shallow(<Rating stars={1} readonly={false} />);
  });
});
