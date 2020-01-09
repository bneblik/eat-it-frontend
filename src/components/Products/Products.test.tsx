import React from 'react';
import { shallow } from 'enzyme';
import { Products } from './Products.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('Products', () => {
  it('renders without crashing', () => {
    shallow(<Products component="MyFridge" />);
  });
});
