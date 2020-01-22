import React from 'react';
import { mount } from 'enzyme';
import Meal from './Meal.component';
import { Provider } from 'react-redux';
import { MealStateType, TMeal } from '../../types/MealTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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
  createdAt: new Date(),
  ingredients: [
    { id: 1, name: 'butter', calories: 12, fats: 123, carbs: 22, proteins: 2, category: 'dairy' }
  ],
  calories: 200,
  fats: 9,
  proteins: 16.5,
  carbs: 16,
  prepareTime: '30 min',
  category: 'dinner',
  video: 'aajds'
};
const initialState: MealStateType = {
  meal: undefined,
  pending: false,
  error: null
};
const id = '5';
let store: any;
let meal: any;
window.scrollTo = jest.fn();

describe('Meal', () => {
  beforeEach(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore({
      mealReducer: initialState
    });
    meal = mount(
      <Provider store={store}>
        <Meal match={{ params: { id: id } }} />
      </Provider>
    );
  });
  it('should display text', () => {
    expect(store.getActions()).toEqual([{ type: 'FETCH_MEAL_PENDING' }]);
    expect(meal.text()).toContain(`Cannot find element with id = ${id}`);
  });
  it('should display text', () => {
    initialState.meal = testMeal;

    mount(
      <Provider store={store}>
        <Meal match={{ params: { id: '5' } }} />
      </Provider>
    );
    expect(store.getState().mealReducer.meal).toEqual(testMeal);
  });
});
