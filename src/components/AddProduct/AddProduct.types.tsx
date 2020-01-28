import { ProductType, ProductsState } from '../../types/Products';

export type AddProductState = {
  product: ProductType;
  amount: string;
  category: string;
  calories: string;
  carbs: string;
  fats: string;
  proteins: string;
  unit: string;
  dialogOpened: boolean;
  productsReducer: ProductsState;
};

export type AddProductProps = {
  /**
   * describes where the new product will be added
   */
  buttonName: string;
  /**
   * contains products to display as autocomplete options
   */
  productsList: ProductType[];
  /**
   * adds a product
   */
  addProduct: (product: ProductType, category: string, amount: string) => void;
};
export const defultStateAddProduct: AddProductState = {
  product: {} as ProductType,
  amount: '',
  category: '',
  calories: '',
  carbs: '',
  fats: '',
  unit: '',
  proteins: '',
  dialogOpened: false,
  productsReducer: {} as ProductsState
};
