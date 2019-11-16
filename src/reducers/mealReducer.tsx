import { ADD_MEAL, MealsState, MealsActionType } from '../types/Meals';

const initialState: MealsState = {
  mealsList: [{ id: 1, name: 'very tasty meal', recipe: 'what to do' }],
};

export function addMealReducer(state = initialState, action: MealsActionType) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        mealsList: [...state.mealsList, action.meal],
      };
    default:
      return state;
  }
}
