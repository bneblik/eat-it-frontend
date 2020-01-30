import React from 'react';
import { shallow } from 'enzyme';
import { Autocomplete } from './Autocomplete.component';
import { ProductType } from '../../types/Products';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

let wrapper: any;
let component: any;

describe('Autocomplete', () => {
  beforeEach(() => {
    wrapper = shallow(<Autocomplete product={{} as ProductType} handleChangeProduct={() => {}} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
