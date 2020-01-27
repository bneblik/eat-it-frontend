import React from 'react';
import { shallow } from 'enzyme';
import { MyMealPlan } from './MyMealPlan.component';
import { TMeal } from '../../types/MealTypes';
import { addDays, format } from 'date-fns';

jest.mock('../..', () => ({
  get i18n() {
    return { _: (data: string) => data };
  }
}));

const testMeal: TMeal = {
  id: 1,
  name: 'Spaghetti carbonara',
  description: 'It is a short description',
  recipe: ['step 1', 'step 2', 'step 3', 'step 4'],
  createdAt: new Date(),
  ingredients: [
    { id: 1, name: 'butter', unit: 'g', calories: 12, fats: 123, carbs: 22, proteins: 2, category: 'dairy' }
  ],
  calories: 200,
  fats: 9,
  proteins: 16.5,
  carbs: 16,
  prepareTime: '30 min',
  category: 'dinner',
  video: 'aajds'
};

let wrapper: any;
let component: any;

describe('MyMealPlan', () => {
  beforeEach(() => {
    const props = {
      selectedDate: new Date(),
      changeSelectedDate: () => {
        return {} as any;
      },
      mealPlan: [],
      fetchMealPlan: () => {
        return {} as any;
      }
    };
    wrapper = shallow(<MyMealPlan {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
  it('displays mealplan for current day', () => {
    const title = wrapper.find('h2');
    expect(title.props().children[0]).toEqual('My meal plan for ');
    expect(title.props().children[1]).toEqual('today');
  });
  it('displays selected day and its info', () => {
    // given
    const today = new Date();
    const selectedDay = addDays(today, 2);
    // when
    wrapper.setProps({ selectedDate: selectedDay, mealPlan: [testMeal] });
    const title = wrapper.find('h2');
    const mealInfos = wrapper.find('MealInfo');
    // denn
    expect(title.props().children[1]).toEqual(format(selectedDay, 'EEEE'));
    expect(mealInfos.length).toEqual(1);
  });
});
