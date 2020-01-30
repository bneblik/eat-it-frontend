import {
  FetchShoppingListSuccAction,
  TShoppingList,
  FETCH_SHOPPING_LIST_SUCC,
  FETCH_SHOPPING_LIST_ERROR,
  FETCH_SHOPPING_LIST_PENDING
} from '../../types/ShoppingList';
import { axiosInstanceWithAuth, requestConsts } from '../../utils/RequestService';

function fetchMyShoppingListSuccess(shoppingList: TShoppingList[]): FetchShoppingListSuccAction {
  return {
    type: FETCH_SHOPPING_LIST_SUCC,
    shoppingList
  };
}

function fetchShoppingListError(error: any) {
  return {
    type: FETCH_SHOPPING_LIST_ERROR,
    error
  };
}

function fetchShoppingListPending() {
  return {
    type: FETCH_SHOPPING_LIST_PENDING
  };
}

function mapDataToShoppingList(data) {
  let shoppingList = [];
  data.forEach((p) => {
    const catId = p.attributes.category_id;
    const product = { id: p.attributes.product_id, ...p.attributes };
    if (shoppingList.find((e) => e.categoryId === catId)) {
      shoppingList = shoppingList.map((f) =>
        f.categoryId === catId ? { ...f, products: [...f.products, product] } : f
      );
    } else {
      shoppingList.push({
        categoryName: p.attributes.category_name,
        categoryId: catId,
        products: [product]
      });
    }
  });
  return shoppingList;
}

export function fetchMyShoppingList() {
  return (dispatch: any) => {
    dispatch(fetchShoppingListPending());
    axiosInstanceWithAuth
      .get(requestConsts.SHOPPING_LIST_URL)
      .then((response) => {
        const shoppingList = mapDataToShoppingList(response.data.data);
        dispatch(fetchMyShoppingListSuccess(shoppingList));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchShoppingListError(error.toString()));
        else if (error.response.status !== '403') dispatch(fetchShoppingListError(error.response.statusText));
      });
  };
}
