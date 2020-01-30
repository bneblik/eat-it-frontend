import { ProductType } from '../../types/Products';

export type AutocompleteProps = {
  product: ProductType;
  handleChangeProduct: (product: any) => void;
};
export interface AutocompleteState {
  productsList: ProductType[];
  pending: boolean;
  error: any;
}

export const initialAutocompleteState: AutocompleteState = {
  productsList: [],
  pending: false,
  error: null
};
