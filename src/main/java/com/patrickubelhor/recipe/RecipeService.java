package com.patrickubelhor.recipe;

import com.patrickubelhor.recipe.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
	
	private final RecipeRepository recipeRepository;
	
	@Autowired
	RecipeService(RecipeRepository recipeRepository) {
		this.recipeRepository = recipeRepository;
	}
	
	
	public void createRecipe(Recipe recipe) {
		recipeRepository.save(recipe);
	}
	
	
	public List<Recipe> getAllRecipes() {
		return recipeRepository.findAllRecipes();
	}
	
	
	public void deleteRecipe(Long recipeId) {
		recipeRepository.deleteById(recipeId);
	}
	
}
