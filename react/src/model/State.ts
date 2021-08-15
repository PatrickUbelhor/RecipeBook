import { Recipe } from './Recipe';
import { User } from './user.model';

export interface IAppState {
	theme: string;
	errorMessage: string;
	token: string;
	self: User;
	recipes: Recipe[];
	selectedRecipe: Recipe;
}
