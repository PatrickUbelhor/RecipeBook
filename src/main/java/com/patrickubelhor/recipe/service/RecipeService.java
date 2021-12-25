package com.patrickubelhor.recipe.service;

import com.patrickubelhor.recipe.exception.RecipeNotFoundException;
import com.patrickubelhor.recipe.model.User;
import com.patrickubelhor.recipe.repository.RecipeRepository;
import com.patrickubelhor.recipe.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RecipeService {
	
	private final RecipeRepository recipeRepository;
	
	@Autowired
	RecipeService(RecipeRepository recipeRepository) {
		this.recipeRepository = recipeRepository;
	}
	
	public Recipe getRecipe(Long recipeId) {
		return recipeRepository.findById(recipeId)
				.orElseThrow(() -> new RecipeNotFoundException(recipeId));
	}
	
	
	public void createRecipe(User user, Recipe recipe) {
		recipe.setOwnerId(user.getId());
		recipeRepository.save(recipe);
	}
	
	
	public List<Recipe> getAllRecipes() {
		return recipeRepository.findAllRecipes();
	}
	
	
	public Recipe updateRecipe(Long userId, Long recipeId, Recipe nextRecipe) {
		Recipe oldRecipe = recipeRepository.findRecipeByOwnerIdAndId(userId, recipeId)
				.orElseThrow(() -> new RecipeNotFoundException(recipeId));
		
		nextRecipe.setId(oldRecipe.getId());
		nextRecipe.setOwnerId(oldRecipe.getOwnerId());
		recipeRepository.save(nextRecipe);
		
		return nextRecipe;
	}
	
	
	public void deleteRecipe(Long recipeId) {
		recipeRepository.deleteById(recipeId);
	}
	
}
