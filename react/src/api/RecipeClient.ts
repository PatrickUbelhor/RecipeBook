import axios, { AxiosResponse } from 'axios';
import { NewRecipe, Recipe } from '../model/recipe.model';

type RecipeResponse<T> = Promise<AxiosResponse<T>>;

class RecipeClient {

	recipeClient = axios.create({
		baseURL: process.env.REACT_APP_SERVER_URL
	});


	getAllRecipes = (token: string): RecipeResponse<Recipe[]> => {
		const url = '/recipe';
		const config = {
			headers: { token: token }
		};

		return this.recipeClient.get(url, config);
	};


	createRecipe = (token: string, recipe: NewRecipe): RecipeResponse<Recipe> => {
		const url = '/recipe';
		const config = {
			headers: { token: token }
		};

		return this.recipeClient.post(url, recipe, config);
	};


	updateRecipe = (token: string, id: number, recipe: NewRecipe): RecipeResponse<Recipe> => {
		const url = `/recipe/${id}`;
		const config = {
			headers: { token: token }
		};

		return this.recipeClient.put(url, recipe, config);
	};


	deleteRecipe = (token: string, recipe: Recipe): RecipeResponse<void> => {
		const url = `/recipe/${recipe.id}`;
		const config = {
			headers: { token: token }
		};

		return this.recipeClient.delete(url, config);
	};

}

export default new RecipeClient();
