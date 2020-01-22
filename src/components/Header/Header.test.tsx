import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

let wrapper: any;
let component: any;
let mockLogOut: any;
let token = undefined;
Storage.prototype.getItem = jest.fn(() => token);

describe('Header', () => {
  mockLogOut = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<Header logout={mockLogOut} history={{}} match={{}} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
  it('displays log in button', () => {
    const button = wrapper.find('#logIn');
    expect(button.length).toEqual(1);
  });
  it('does not display log out button', () => {
    const button = wrapper.find('#logOut');
    expect(button.length).toEqual(0);
  });

  it('does not display log out button', () => {
    token = 'aaa';
    wrapper = shallow(<Header logout={mockLogOut} history={{}} match={{}} />);
    const button = wrapper.find('#logOut');
    button.simulate('click');
    expect(mockLogOut).toHaveBeenCalled();
  });
});
