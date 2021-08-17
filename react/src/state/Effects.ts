import authClient from '../api/AuthClient';
import recipeClient from '../api/RecipeClient';
import userClient from '../api/UserClient';
import { NewRecipe, Recipe } from '../model/Recipe';
import { createRecipeSuccess, deleteRecipeSuccess, getRecipesSuccess, loginSuccess, logoutSuccess, setError, setThemeSuccess } from './Actions';


const handleError = (error: any, message: string, dispatch) => {
	if (error.response === undefined) {
		console.log('An unknown error has occurred');
		console.log(error);
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

	const token = localStorage.getItem('token');
	const self = JSON.parse(localStorage.getItem('self'));
	if (token && self) {
		dispatch(loginSuccess(token, self))
	} else {
		localStorage.removeItem('token');
		localStorage.removeItem('self');
	}
};

export const setTheme = (theme: string) => async (dispatch, getState) => {
	const from = getState().theme;
	const to = theme;

	document.body.classList.replace(from, to);
	localStorage.setItem('theme', to);
	dispatch(setThemeSuccess(to));
};

export const login = (email: string, password: string, remember: boolean) => async (dispatch) => {
	console.log('Logging in');

	try {
		const response = await authClient.login(email, password);
		console.log(response)
		const token = response.headers.token;
		const self = response.data

		if (remember) {
			localStorage.setItem('token', token);
			localStorage.setItem('self', JSON.stringify(self));
		}

		dispatch(loginSuccess(token, self));
	} catch (error) {
		handleError(error, 'Something went wrong logging in', dispatch);
	}
};

export const logout = () => async (dispatch, getState) => {
	try {
		await authClient.logout(getState().token);
		localStorage.clear(); // TODO: preserve theme?
		dispatch(logoutSuccess());
	} catch (error) {
		handleError(error, 'Something went wrong logging out', dispatch);
	}
}

export const createUser = (email: string, username: string, password: string, remember: boolean) => async (dispatch) => {
	console.log('Creating user');

	try {
		let response = await userClient.createUser(email, username, password);
		const token = response.headers.token;
		const self = response.data;

		if (remember) {
			localStorage.setItem('token', token);
			localStorage.setItem('self', JSON.stringify(self));
		}

		dispatch(loginSuccess(token, self));
	} catch (error) {
		handleError(error, 'Something went wrong creating a user', dispatch);
	}
};

export const getRecipes = () => async (dispatch, getState) => {
	console.log('Getting recipes');

	try {
		let response = await recipeClient.getAllRecipes(getState().token);
		dispatch(getRecipesSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong getting the list of recipes', dispatch);
	}
};

export const createRecipe = (recipe: NewRecipe) => async (dispatch, getState) => {
	try {
		const response = await recipeClient.createRecipe(getState().token, recipe);
		dispatch(createRecipeSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong creating a recipe', dispatch);
	}
};

export const deleteRecipe = (recipe: Recipe) => async (dispatch, getState) => {
	try {
		await recipeClient.deleteRecipe(getState().token, recipe);
		dispatch(deleteRecipeSuccess(recipe));
	} catch (error) {
		handleError(error, 'Something went wrong deleting the recipe', dispatch);
	}
};
