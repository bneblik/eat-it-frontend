export interface RecipeProps {
  /**
   * List of steps in the recipe
   */
  steps: string[];
  removeStep: (step: string) => void;
  addStep: (step: string) => void;
}

export interface RecipeState {
  newStep: string;
}
