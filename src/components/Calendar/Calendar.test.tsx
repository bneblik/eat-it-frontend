import React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from './Calendar.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('Calendar', () => {
  it('renders without crashing', () => {
    shallow(<Calendar />);
  });
});
