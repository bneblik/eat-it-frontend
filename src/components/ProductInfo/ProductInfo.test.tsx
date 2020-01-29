import React from 'react';
import { shallow } from 'enzyme';
import { ProductInfo } from './ProductInfo.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

describe('ProductInfo', () => {
  it('renders without crashing', () => {
    shallow(<ProductInfo selected={true} markAsSelected={() => {}} product={{} as any} />);
  });
});
