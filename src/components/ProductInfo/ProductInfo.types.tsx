import { ProductType } from '../../types/Products';

export interface ProductInfoProps {
  /**
   * contains information about product to display
   */
  product: ProductType;
  selected: boolean;
  markAsSelected: (id: number, amount: string, selected: boolean) => void;
}
