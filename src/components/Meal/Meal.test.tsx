import React from 'react';
import { shallow } from 'enzyme';
import { Meal } from './Meal.component';
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
  recipe: ['Heat pasta water: Put a large pot of salted water on to boil (1 Tbsp salt for every 2 '],
  ingredients: [
    {
      id: 1,
      name: 'butter',
      unit: 'g',
      calories: 12,
      fats: 123,
      carbs: 22,
      proteins: 2,
      category: { name: 'dairy', id: 1 }
    }
  ],
  calories: 200,
  fats: 9,
  proteins: 16.5,
  carbs: 16,
  prepareTime: '30 min',
  category: { id: 1, name: 'dinner' },
  video: 'aajds'
};
const id = '5';
window.scrollTo = jest.fn();
let wrapper: any;
let component: any;
let mockedFetch: any;

describe('Meal', () => {
  beforeEach(() => {
    mockedFetch = jest.fn();
    const props = {
      error: null,
      meal: undefined,
      pending: false,
      match: { params: { id, lng: '' } },
      fetchMeal: mockedFetch,
      addIngredientsToList: jest.fn(),
      clearShoppingListError: jest.fn(),
      clearShoppingListSuccess: jest.fn(),
      addIngredientsToListStatus: { error: null, success: null, pending: false },
      history: {} as any
    };
    wrapper = shallow(<Meal {...props} />);
    component = wrapper.instance();
  });
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
  it('should display text', () => {
    expect(mockedFetch).toHaveBeenCalled();
    const content = wrapper.find('div').props().children;
    expect(content[0]).toContain(`Cannot find element with id`);
    expect(content[2]).toContain(id);
  });
  it('should display text', () => {
    wrapper.setProps({ meal: testMeal });
    wrapper.update();
    const content = wrapper.find('.about h1').props().children;
    expect(content).toContain(testMeal.name);
  });
});
