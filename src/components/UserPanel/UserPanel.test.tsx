import React from 'react';
import { shallow } from 'enzyme';
import { UserPanel } from './UserPanel.component';

describe('UserPanel', () => {
  it('renders without crashing', () => {
    shallow(<UserPanel username="username1" />);
  });
});
