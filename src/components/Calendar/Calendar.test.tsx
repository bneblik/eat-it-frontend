import React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from './Calendar.component';
import { enGB } from 'date-fns/locale';
import { format } from 'date-fns';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));
let wrapper: any;
let component: any;

const mockChangeDate = jest.fn((date: Date) => {
  wrapper.setProps({ selectedDate: date });
});
describe('Calendar', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Calendar selectedDate={new Date('11.11.2019')} changeSelectedDate={mockChangeDate} dateLocale={enGB} />
    );
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
  it('moves to the previous month', () => {
    const nextMonth = wrapper.find('#nextMonth');
    nextMonth.simulate('click');
    expect(mockChangeDate).toHaveBeenCalled();
    const monthAndYear = wrapper.find('h3#header').text();
    expect(monthAndYear).toEqual('December 2019');
  });
  it('moves to the next month', () => {
    const nextMonth = wrapper.find('#prevMonth');
    nextMonth.simulate('click');
    expect(mockChangeDate).toHaveBeenCalled();
    const monthAndYear = wrapper.find('h3#header').text();
    expect(monthAndYear).toEqual('October 2019');
  });
  it('sets today as selected day', () => {
    const nextMonth = wrapper.find('#today');
    nextMonth.simulate('click');
    expect(mockChangeDate).toHaveBeenCalled();
    const monthAndYear = wrapper.find('h3#header').text();
    expect(monthAndYear).toEqual(format(new Date(), 'LLLL yyyy'));
  });
});
