import { FetchProductsAction, ProductType, FETCH_PRODUCTS } from '../types/Products';

const fetchedProducts: ProductType[] = [
  { id: 1, name: 'eggq', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  {
    id: 2,
    name: 'example of a very long product name',
    calories: 10,
    fats: 8,
    proteins: 7,
    carbs: 6,
    category: 'cat1'
  },
  { id: 3, name: 'tomatos', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 4, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 5, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 6, name: 'bread', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 7, name: 'tomato', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 8, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 9, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 10, name: 'bread', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat1' },
  { id: 11, name: 'tomato', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat2' },
  { id: 12, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat2' },
  { id: 13, name: 'tomatos', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat2' },
  { id: 14, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat2' },
  { id: 15, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat3' },
  { id: 16, name: 'bread', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat3' },
  { id: 17, name: 'tomato', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat3' },
  { id: 18, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat3' },
  { id: 19, name: 'bread', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat4' },
  { id: 20, name: 'tomato', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat4' },
  { id: 21, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat5' },
  { id: 22, name: 'bread', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat5' },
  { id: 23, name: 'tomato', calories: 10, fats: 8, proteins: 7, carbs: 6, category: 'cat6' }
];

export function fetchProducts(): FetchProductsAction {
  return {
    type: FETCH_PRODUCTS,
    products: fetchedProducts
  };
}
