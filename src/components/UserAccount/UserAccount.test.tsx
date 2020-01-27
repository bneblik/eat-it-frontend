import React from 'react';
import { shallow } from 'enzyme';
import { UserAccount } from './UserAccount.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('UserAccount', () => {
  it('renders without crashing', () => {
    shallow(<UserAccount location={{}} history={{}} />);
  });
});
