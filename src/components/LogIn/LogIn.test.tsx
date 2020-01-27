import React from 'react';
import LogIn from './LogIn.component';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;

describe('LogIn', () => {
  beforeEach(() => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      authReducer: { error: '' } as any,
      email: '',
      password: ''
    });
    wrapper = mount(
      <Provider store={store}>
        <LogIn history={{} as any} location={{}} />
      </Provider>
    );
    component = wrapper.find('LogIn').instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('should log in', () => {
    // given
    const spy = jest.spyOn(component, 'logIn');
    const emailInput = wrapper.find('.emailField input');
    const pswdInput = wrapper.find('.passwordField input');
    const confirmButton = wrapper.find('.confirmButton button');
    // when
    emailInput.simulate('change', { target: { value: 'test@test.com' } });
    pswdInput.simulate('change', { target: { value: 'password' } });
    confirmButton.simulate('click');
    // then
    expect(spy).toHaveBeenCalled();
    wrapper.update();
    component = wrapper.find('LogIn').instance();
  });
});
