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
  recipe:
    "Heat pasta water: Put a large pot of salted water on to boil (1 Tbsp salt for every 2 quarts of water.)\nSauté pancetta/bacon and garlic: While the water is coming to a boil, heat the olive oil in a large sauté pan over medium heat. Add the bacon or pancetta and cook slowly until crispy. Add the garlic (if using) and cook another minute, then turn off the heat and put the pancetta and garlic into a large bowl.\nBeat eggs and half of the cheese: In a small bowl, beat the eggs and mix in about half of the cheese.\nCook pasta: Once the water has reached a rolling boil, add the dry pasta, and cook, uncovered, at a rolling boil.\nToss pasta with pancetta/bacon: When the pasta is al dente (still a little firm, not mushy), use tongs to move it to the bowl with the bacon and garlic. Let it be dripping wet. Reserve some of the pasta water. Move the pasta from the pot to the bowl quickly, as you want the pasta to be hot. It's the heat of the pasta that will heat the eggs sufficiently to create a creamy sauce.\nToss everything to combine, allowing the pasta to cool just enough so that it doesn't make the eggs curdle when you mix them in. (That's the tricky part.)\n6 Add the beaten egg mixture: Add the beaten eggs with cheese and toss quickly to combine once more. Add salt to taste. Add some pasta water back to the pasta to keep it from drying out.",
  createdAt: new Date(),
  ingredients: ['butter', 'bacon', 'garlic', 'eggs', 'parmesan', 'spaghetti pasta', 'salt', 'pepper'],
  calories: 200,
  fats: 9,
  protein: 16.5,
  carbs: 16,
  prepareTime: '30 min',
  servings: 1,
  category: 'dinner'
};
const initialState: MealStateType = {
  meal: undefined,
  pending: false,
  error: null
};
const id = '5';
let store: any;
let meal: any;

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
    spyOn(window, 'scrollTo').and.callFake(() => {});
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
