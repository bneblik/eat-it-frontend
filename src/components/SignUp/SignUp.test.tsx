import React from 'react';
import { mount } from 'enzyme';
import SignUp from './SignUp.component';
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
let store: any;

describe('SignUp', () => {
  beforeEach(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore({
      createUserReducer: {} as any,
      username: '',
      email: '',
      emailErrorText: '',
      password: '',
      paswdErrorText: '',
      repeatPass: '',
      repeatPaswdErrorText: ''
    });
    wrapper = mount(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    component = wrapper.find('SignUp').instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('should have disabled button', () => {
    expect(component.isSubmitDisabled()).toBeTruthy();
    expect(wrapper.find('.confirmButton button').props().disabled).toBeTruthy();
  });

  it('should enable button', () => {
    // given
    const emailInput = wrapper.find('.emailField input');
    const pswdInput = wrapper.find('.passwordField input');
    const repeatPswdInput = wrapper.find('.repeatPswdField input');
    // when
    emailInput.simulate('change', { target: { value: 'test@test.com' } });
    pswdInput.simulate('change', { target: { value: 'password' } });
    repeatPswdInput.simulate('change', { target: { value: 'password' } });
    // then
    expect(wrapper.find('form p.Mui-error').length).toEqual(0);
    expect(component.isSubmitDisabled()).toBeFalsy();
    expect(wrapper.find('.confirmButton button').props().disabled).toBeFalsy();
  });

  it('should email validate', () => {
    // given
    const emailInput = wrapper.find('.emailField input');
    // when
    emailInput.simulate('change', { target: { value: 'test' } });
    wrapper.update();
    // then
    const errorText = wrapper.find('.emailField p.Mui-error');
    expect(errorText.props().children).toEqual('invalid email address');
  });

  it('should password validate', () => {
    // given
    const passwordInput = wrapper.find('.passwordField input');
    // when
    passwordInput.simulate('change', { target: { value: '1234' } });
    wrapper.update();
    // then
    const errorText = wrapper.find('.passwordField p.Mui-error');
    expect(errorText.props().children).toEqual('password should have minimum 6 characters');
  });

  it('should repeated password validate', () => {
    // given
    const passwordInput = wrapper.find('.passwordField input');
    const repeatInput = wrapper.find('.repeatPswdField input');
    // when
    passwordInput.simulate('change', { target: { value: '123456' } });
    repeatInput.simulate('change', { target: { value: '1234' } });
    wrapper.update();
    // then
    const errorText = wrapper.find('.repeatPswdField p.Mui-error');
    expect(errorText.props().children).toEqual('passwords should match');
  });

  it('should new user create', () => {
    // given
    const spy = jest.spyOn(component, 'signUp');
    const emailInput = wrapper.find('.emailField input');
    const pswdInput = wrapper.find('.passwordField input');
    const repeatPswdInput = wrapper.find('.repeatPswdField input');
    const confirmButton = wrapper.find('.confirmButton button');
    // when
    emailInput.simulate('change', { target: { value: 'test@test.com' } });
    pswdInput.simulate('change', { target: { value: 'password' } });
    repeatPswdInput.simulate('change', { target: { value: 'password' } });
    confirmButton.simulate('click');
    // then
    expect(spy).toHaveBeenCalled();
  });
});
