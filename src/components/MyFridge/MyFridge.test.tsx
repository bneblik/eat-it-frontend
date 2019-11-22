import React from 'react';
import { shallow } from 'enzyme';
import { MyFridge } from './MyFridge.component';

describe('MyFridge', () => {
  it('renders without crashing', () => {
    shallow(<MyFridge />);
  });
});
