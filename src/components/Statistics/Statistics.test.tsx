import React from 'react';
import { shallow } from 'enzyme';
import { Statistics } from './Statistics.component';
jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;

describe('Statistics', () => {
  beforeEach(() => {
    const props = {
      fetchStatisticsForDay: () => {
        return {} as any;
      },
      day: null,
      statistics: undefined,
      pending: false,
      clearStatisticsError: jest.fn(),
      error: null
    };
    wrapper = shallow(<Statistics {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
