import { Recipe } from './Recipe';
import { User } from './user.model';

export interface IAppState {
	theme: string;
	errorMessage: string;
	user: User;
	recipes: Recipe[];
	selectedRecipe: Recipe;
}
