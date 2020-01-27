import { MealStateType, TMeal } from '../../types/MealTypes';
import { addMeal, clearAddMealSuccess, clearAddMealError, editMeal } from '../../actions/mealAction';
import { ProductsState, ProductType } from '../../types/Products';

export type AddMealProps = {
  /**
   * contains products to display as autocomplete options
   */
  productsList: ProductType[];
  addMeal: typeof addMeal;
  editMeal: typeof editMeal;
  clearAddMealError: typeof clearAddMealError;
  clearAddMealSuccess: typeof clearAddMealSuccess;
  /**
   * contains an error message or is null
   */
  error: any | null;
  /**
   * contains informations about meal if defined
   */
  success: string | null;
  /**
   * determines whether adding is pending
   */
  pending: boolean;
  mealToEdit: TMeal | undefined;
};
export interface AddMealState {
  name: string;
  recipeSteps: string[];
  description: string;
  prepTime: string;
  category: string;
  video: string;
  videoHelperText: string;
  selectedProduct: ProductType;
  productsReducer: ProductsState;
  selectedProductsList: ProductType[];
  mealReducer: MealStateType;
  selectedFile: any;
}

export const initialAddMealState: AddMealState = {
  name: '',
  recipeSteps: [],
  description: '',
  prepTime: '',
  category: '',
  video: '',
  videoHelperText: '',
  selectedProduct: {} as ProductType,
  selectedProductsList: [],
  selectedFile: null,
  productsReducer: {} as ProductsState,
  mealReducer: {} as MealStateType
};
