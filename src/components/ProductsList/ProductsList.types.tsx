import { ProductType } from '../../types/Products';

export interface ProductsListProps {
  removeProduct: (product: ProductType) => void;
  changeAmount: (product: ProductType, amount: string) => void;
  /**
   * contains products to display
   */
  productsList: ProductType[];
}
