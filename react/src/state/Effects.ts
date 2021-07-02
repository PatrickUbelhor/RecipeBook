import recipeClient from '../api/RecipeClient';
import { NewRecipe, Recipe } from '../model/Recipe';
import { createRecipeSuccess, deleteRecipeSuccess, getRecipesSuccess, setError, setThemeSuccess } from './Actions';


const handleError = (error: any, message: string, dispatch) => {
	if (error.response === undefined) {
		console.log('An unknown error has occurred');
		dispatch(setError(message));
		return;
	}

	console.log(error.response);
	dispatch(setError(message));
};

export const initApp = () => async (dispatch) => {
	const theme = localStorage.getItem('theme');
	if (theme) {
		dispatch(setThemeSuccess(theme));
	}
};

export const setTheme = (theme: string) => async (dispatch, getState) => {
	const from = getState().theme;
	const to = theme;

	document.body.classList.replace(from, to);
	localStorage.setItem('theme', to);
	dispatch(setThemeSuccess(to));
};

export const getRecipes = () => async (dispatch) => {
	console.log('Getting recipes');

	try {
		let response = await recipeClient.getAllRecipes();
		dispatch(getRecipesSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong getting the list of recipes', dispatch);
	}
};

export const createRecipe = (recipe: NewRecipe) => async (dispatch) => {
	try {
		const response = await recipeClient.createRecipe(recipe);
		dispatch(createRecipeSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong creating a recipe', dispatch);
	}
};

export const deleteRecipe = (recipe: Recipe) => async (dispatch) => {
	try {
		await recipeClient.deleteRecipe(recipe);
		dispatch(deleteRecipeSuccess(recipe));
	} catch (error) {
		handleError(error, 'Something went wrong deleting the recipe', dispatch);
	}
};
