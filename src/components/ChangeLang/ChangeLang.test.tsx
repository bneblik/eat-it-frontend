import React from 'react';
import { shallow } from 'enzyme';
import ChangeLang from './ChangeLang.component';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data, availableLanguages: ['en'] };
  }
}));

let wrapper: any;
let component: any;

describe('ChangeLang', () => {
  beforeEach(() => {
    const props = {
      history: { location: { pathname: '' } } as any,
      match: { url: '' }
    };
    wrapper = shallow(<ChangeLang {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
