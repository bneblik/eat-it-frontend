import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('Header', () => {
  it('renders without crashing', () => {
    shallow(<Header logout={() => {}} history={{}} match={{}} />);
  });
});
