import React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from './Calendar.component';

describe('Calendar', () => {
  it('renders without crashing', () => {
    shallow(<Calendar />);
  });
});
