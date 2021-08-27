import { Recipe } from '../model/recipe.model';
import { User } from '../model/user.model';

export interface Action {
	type: Actions,
	payload?: any
}

export enum Actions {
	SET_ERROR = '[ERROR] Set error msg',
	CLEAR_ERROR = '[ERROR] Clear error msg',
	SET_THEME_SUCCESS = '[THEME] Set theme',

	LOGIN_SUCCESS = '[AUTH] Successfully logged in',
	LOGOUT_SUCCESS = '[AUTH] Successfully logged out',

	GET_RECIPES_SUCCESS = '[RECIPE] Successfully got recipes',
	CREATE_RECIPE_SUCCESS = '[RECIPE] Successfully created recipe',
	DELETE_RECIPE_SUCCESS = '[RECIPE] Successfully deleted recipe',
	UPDATE_RECIPE_SUCCESS = '[RECIPE] Successfully updated recipe',

	SELECT_RECIPE = '[HOME] Selected recipe'
}


export const setError = (message: string): Action => ({
	type: Actions.SET_ERROR,
	payload: message
});

export const clearError = () => ({
	type: Actions.CLEAR_ERROR
});

export const setThemeSuccess = (theme: string): Action => ({
	type: Actions.SET_THEME_SUCCESS,
	payload: theme
});

export const loginSuccess = (token: string, self: User): Action => ({
	type: Actions.LOGIN_SUCCESS,
	payload: {
		token: token,
		self: self
	}
});

export const logoutSuccess = (): Action => ({
	type: Actions.LOGOUT_SUCCESS
});

export const getRecipesSuccess = (recipes: Recipe[]): Action => ({
	type: Actions.GET_RECIPES_SUCCESS,
	payload: recipes
});

export const createRecipeSuccess = (recipe: Recipe): Action => ({
	type: Actions.CREATE_RECIPE_SUCCESS,
	payload: recipe
});

export const deleteRecipeSuccess = (recipe: Recipe): Action => ({
	type: Actions.DELETE_RECIPE_SUCCESS,
	payload: recipe
});

export const updateRecipeSuccess = (recipe: Recipe): Action => ({
	type: Actions.UPDATE_RECIPE_SUCCESS,
	payload: recipe
});

export const selectRecipe = (recipe: Recipe): Action => ({
	type: Actions.SELECT_RECIPE,
	payload: recipe
});
