package com.patrickubelhor.recipe.repository;

import com.patrickubelhor.recipe.model.Recipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends CrudRepository<Recipe, Long> {
	
	
	@Query(value = "SELECT recipes FROM Recipe recipes")
	List<Recipe> findAllRecipes();
	
	Optional<Recipe> findRecipeByOwnerIdAndId(Long ownerId, Long recipeId);
	
}
