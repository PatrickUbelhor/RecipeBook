import axios, { AxiosResponse } from 'axios';
import { NewRecipe, Recipe } from '../model/Recipe';

type RecipeResponse<T> = Promise<AxiosResponse<T>>;

class RecipeClient {

	recipeClient = axios.create({
		baseURL: process.env.REACT_APP_SERVER_URL
	});


	getAllRecipes = (): RecipeResponse<Recipe[]> => {
		return this.recipeClient.get('/recipe');
	};


	createRecipe = (recipe: NewRecipe): RecipeResponse<Recipe> => {
		return this.recipeClient.post('/recipe', recipe);
	}


	deleteRecipe = (recipe: Recipe): RecipeResponse<void> => {
		return this.recipeClient.delete(`/recipe/${recipe.id}`);
	};

}

export default new RecipeClient();
