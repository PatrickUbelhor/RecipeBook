package com.patrickubelhor.recipe;

import com.patrickubelhor.recipe.model.Recipe;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeController {
	
	private static final Logger logger = LogManager.getLogger(RecipeController.class);
	private final RecipeService recipeService;
	
	@Autowired
	public RecipeController(RecipeService recipeService) {
		this.recipeService = recipeService;
	}
	
	
	@PostMapping(value = "/recipe", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
		
		logger.info("Received createRecipe request");
		recipeService.createRecipe(recipe);
		logger.info("Created recipe '{}'", recipe.getName());
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(recipe);
	}
	
	
	@GetMapping(value = "/recipe")
	public ResponseEntity<List<Recipe>> getAllRecipes() {
		logger.info("Received getAllRecipes request");
		List<Recipe> recipes = recipeService.getAllRecipes();
		logger.info("Got all recipes");
		
		return ResponseEntity.ok(recipes);
	}
	
	
	@DeleteMapping(value = "/recipe/{recipeId}")
	public ResponseEntity<Void> deleteRecipe(@PathVariable Long recipeId) {
		logger.info("Received deleteRecipe request");
		recipeService.deleteRecipe(recipeId);
		logger.info("Deleted recipe '{}'", recipeId);
		
		return ResponseEntity.noContent().build();
	}
	
}
