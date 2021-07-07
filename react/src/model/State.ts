import { Recipe } from './Recipe';

export interface IAppState {
	theme: string;
	errorMessage: string;
	recipes: Recipe[],
	selectedRecipe: Recipe
}
