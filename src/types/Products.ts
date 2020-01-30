import { Category } from './Categories';

export type ProductType = {
  id?: number;
  name: string;
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
  category: Category;
  unit: string;
  amount?: string;
  image?: any;
};
