import React from 'react';
import { shallow } from 'enzyme';
import { UserAccount } from './UserAccount.component';

describe('UserAccount', () => {
  it('renders without crashing', () => {
    shallow(<UserAccount />);
  });
});
