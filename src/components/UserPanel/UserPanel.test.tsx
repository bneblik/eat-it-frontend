import React from 'react';
import { shallow } from 'enzyme';
import { UserPanel } from './UserPanel.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('UserPanel', () => {
  it('renders without crashing', () => {
    shallow(<UserPanel username="username1" />);
  });
});
