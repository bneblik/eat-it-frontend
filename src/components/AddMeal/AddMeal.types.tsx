import { MealStateType, TMeal } from '../../types/MealTypes';
import { addMeal, clearAddMealSuccess, clearAddMealError, editMeal } from '../../actions/mealAction';
import { ProductType } from '../../types/Products';
import { Category, CategoriesState } from '../../types/Categories';

export type AddMealProps = {
  /**
   * contains products to display as autocomplete options
   */
  categoriesList: Category[];
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
  category: Category;
  servings: string;
  video: string;
  videoHelperText: string;
  selectedProduct: ProductType;
  selectedProductsList: ProductType[];
  mealReducer: MealStateType;
  selectedFile: any;
  categoriesReducer: CategoriesState;
}

export const initialAddMealState: AddMealState = {
  name: '',
  recipeSteps: [],
  description: '',
  prepTime: '',
  category: {} as Category,
  servings: '1',
  video: '',
  videoHelperText: '',
  selectedProduct: {} as ProductType,
  selectedProductsList: [],
  selectedFile: null,
  mealReducer: {} as MealStateType,
  categoriesReducer: {} as CategoriesState
};
