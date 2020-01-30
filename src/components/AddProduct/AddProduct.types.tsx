import { ProductType } from '../../types/Products';

export type AddProductState = {
  product: ProductType;
  amount: string;
  categoryName: string;
  categoryId: number;
  calories: string;
  carbs: string;
  fats: string;
  proteins: string;
  unit: string;
  dialogOpened: boolean;
};

export type AddProductProps = {
  /**
   * describes where the new product will be added
   */
  buttonName: string;
  /**
   * adds a product
   */
  addProduct: (product: ProductType, categoryId: number, categoryName: string, amount: string) => void;
};
export const defultStateAddProduct: AddProductState = {
  product: {} as ProductType,
  amount: '',
  categoryName: '',
  categoryId: null,
  calories: '',
  carbs: '',
  fats: '',
  unit: '',
  proteins: '',
  dialogOpened: false
};
