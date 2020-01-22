import {
  FetchShoppingListSuccAction,
  TShoppingList,
  FETCH_SHOPPING_LIST_SUCC,
  ADD_TO_BASKET,
  ShoppingListProduct,
  CHANGE_AMOUNT_IN_LIST,
  REMOVE_PRODUCT_FROM_LIST,
  SAVE_SHOPPING_LIST,
  ADD_PRODUCT_TO_LIST
} from '../types/ShoppingList';

const exampleShoppingList: TShoppingList[] = [
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

function fetchMyShoppingListSuccess(shoppingList: TShoppingList[]): FetchShoppingListSuccAction {
  return {
    type: FETCH_SHOPPING_LIST_SUCC,
    shoppingList
  };
}

export function fetchMyShoppingList() {
  return (dispatch: any) => {
    dispatch(fetchMyShoppingListSuccess(exampleShoppingList));
  };
}

export function addToBasket(product: ShoppingListProduct, category: string) {
  return {
    type: ADD_TO_BASKET,
    product,
    category
  };
}

export function changeAmountInList(product: ShoppingListProduct, category: string, amount: string) {
  return {
    type: CHANGE_AMOUNT_IN_LIST,
    product,
    category,
    amount
  };
}

export function removeProductFromList(product: ShoppingListProduct, category: string) {
  return {
    type: REMOVE_PRODUCT_FROM_LIST,
    product,
    category
  };
}

function saveShoppingListSuccess() {
  return {
    type: SAVE_SHOPPING_LIST
  };
}

export function saveShoppingList() {
  return (dispatch: any) => {
    dispatch(saveShoppingListSuccess());
  };
}

export function addProductToList(product: ShoppingListProduct, category: string, amount: number) {
  return {
    type: ADD_PRODUCT_TO_LIST,
    product,
    category,
    amount
  };
}
