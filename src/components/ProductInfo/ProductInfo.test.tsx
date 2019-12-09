import React from 'react';
import { shallow } from 'enzyme';
import { ProductInfo } from './ProductInfo.component';

describe('ProductInfo', () => {
  it('renders without crashing', () => {
    shallow(<ProductInfo product={{} as any} />);
  });
});
