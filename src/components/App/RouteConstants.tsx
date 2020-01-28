import { defaultLang } from '../../utils/LanguageService';
import { i18n } from '../..';

export const routes = {
  meals: '/meals',
  meal: '/meals/:id',
  addMeal: '/add-meal',
  myFridge: '/my-fridge',
  myMealPlan: '/my-meal-plan',
  userPanel: '/user-panel',
  login: '/login',
  shoppingList: '/shopping-list'
};

export function lang() {
  if (i18n.language === defaultLang) {
    return '';
  }
  return `/${i18n.language}`;
}
