import {
  FetchFridgeSuccAction,
  TFridge,
  FETCH_FRIDGE_SUCC,
  FETCH_FRIDGE_PENDING,
  FETCH_FRIDGE_ERROR
} from '../../types/Fridge';
import { axiosInstanceWithAuth, requestConsts } from '../../utils/RequestService';

function fetchMyFridgeSuccess(fridge: TFridge[]): FetchFridgeSuccAction {
  return {
    type: FETCH_FRIDGE_SUCC,
    fridge
  };
}

function fetchMyFridgeError(error: any) {
  return {
    type: FETCH_FRIDGE_ERROR,
    error
  };
}

function fetchMyFridgePending() {
  return {
    type: FETCH_FRIDGE_PENDING
  };
}

function mapDataToFridge(data) {
  let fridge = [];
  data.forEach((p) => {
    const catId = p.attributes.category_id;
    const product = { id: p.attributes.product_id, ...p.attributes };
    if (fridge.find((e) => e.categoryId === catId)) {
      fridge = fridge.map((f) => (f.categoryId === catId ? { ...f, products: [...f.products, product] } : f));
    } else {
      fridge.push({
        categoryName: p.attributes.category_name,
        categoryId: catId,
        products: [product]
      });
    }
  });
  return fridge;
}

export function fetchMyFridge() {
  return (dispatch: any) => {
    dispatch(fetchMyFridgePending());
    axiosInstanceWithAuth
      .get(requestConsts.FRIDGE_URL)
      .then((response) => {
        const fridge = mapDataToFridge(response.data.data);
        dispatch(fetchMyFridgeSuccess(fridge));
      })
      .catch((error) => {
        if (!error.response) dispatch(fetchMyFridgeError(error.toString()));
        else if (error.response.status !== '403') dispatch(fetchMyFridgeError(error.response.statusText));
      });
  };
}
