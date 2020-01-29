import React from 'react';
import { shallow } from 'enzyme';
import { MealInfo } from './MealInfo.component';
import { TMeal } from '../../types/MealTypes';

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
  prepareTime: '30',
  category: { id: 1, name: 'dinner' },
  video: 'aajds'
};
let wrapper: any;
let component: any;

describe('MealInfo', () => {
  beforeEach(() => {
    wrapper = shallow(<MealInfo meal={testMeal} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
  it('displays correct information', () => {
    // given
    const name = wrapper.find('.name');
    const prepTime = wrapper.find('span#prepTime');
    // when
    // then
    expect(name.props().children).toEqual(testMeal.name);
    expect(prepTime.props().children[0]).toEqual(testMeal.prepareTime);
  });
});
