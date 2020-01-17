import {
  FetchFridgeSuccAction,
  TFridge,
  FETCH_FRIDGE_SUCC,
  FridgeProduct,
  CHANGE_AMOUNT_IN_FRIDGE,
  REMOVE_PRODUCT_FROM_FRIDGE,
  SAVE_FRIDGE
} from '../types/Fridge';

const exampleFridge: TFridge[] = [
  {
    category: 'first category',
    products: [
      { id: 1, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 10 },
      {
        id: 2,
        name: 'example of a very long product name',
        calories: 10,
        fats: 8,
        proteins: 7,
        carbs: 6,
        amount: 1
      },
      { id: 3, name: 'tomatos', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 200 },
      { id: 4, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 },
      { id: 5, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 10 },
      { id: 6, name: 'bread', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 },
      { id: 7, name: 'tomato', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 200 },
      { id: 8, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 },
      { id: 9, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 10 },
      { id: 10, name: 'bread', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 },
      { id: 11, name: 'tomato', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 200 },
      { id: 12, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 }
    ]
  },
  {
    category: 'second category',
    products: [
      { id: 1, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 10 },
      {
        id: 2,
        name: 'example of a very long product name',
        calories: 10,
        fats: 8,
        proteins: 7,
        carbs: 6,
        amount: 1
      },
      { id: 3, name: 'tomatos', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 200 },
      { id: 4, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 }
    ]
  },
  {
    category: 'third category',
    products: [
      { id: 1, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 10 },
      {
        id: 2,
        name: 'example of a very long product name',
        calories: 10,
        fats: 8,
        proteins: 7,
        carbs: 6,
        amount: 1
      },
      { id: 3, name: 'tomatos', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 200 },
      { id: 4, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 }
    ]
  },
  {
    category: 'fourth category',
    products: [
      { id: 1, name: 'egg', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 10 },
      {
        id: 2,
        name: 'example of a very long product name',
        calories: 10,
        fats: 8,
        proteins: 7,
        carbs: 6,
        amount: 1
      },
      { id: 3, name: 'tomatos', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 200 },
      { id: 4, name: 'butter', calories: 10, fats: 8, proteins: 7, carbs: 6, amount: 1 }
    ]
  }
];

function fetchMyFridgeSuccess(fridge: TFridge[]): FetchFridgeSuccAction {
  return {
    type: FETCH_FRIDGE_SUCC,
    fridge
  };
}

export function fetchMyFridge() {
  return (dispatch: any) => {
    dispatch(fetchMyFridgeSuccess(exampleFridge));
  };
}

export function changeAmountInFridge(product: FridgeProduct, category: string, amount: string) {
  return {
    type: CHANGE_AMOUNT_IN_FRIDGE,
    product,
    category,
    amount
  };
}

export function removeProductFromFridge(product: FridgeProduct, category: string) {
  return {
    type: REMOVE_PRODUCT_FROM_FRIDGE,
    product,
    category
  };
}

function saveFridgeSuccess() {
  return {
    type: SAVE_FRIDGE
  };
}

export function saveFridge() {
  return (dispatch: any) => {
    dispatch(saveFridgeSuccess());
  };
}
