package com.patrickubelhor.recipe.controller;

import com.patrickubelhor.recipe.exception.NotOwnerException;
import com.patrickubelhor.recipe.model.Recipe;
import com.patrickubelhor.recipe.model.User;
import com.patrickubelhor.recipe.service.AuthService;
import com.patrickubelhor.recipe.service.RecipeService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeController {
	
	private static final Logger logger = LogManager.getLogger(RecipeController.class);
	private final AuthService authService;
	private final RecipeService recipeService;
	
	@Autowired
	public RecipeController(AuthService authService, RecipeService recipeService) {
		this.authService = authService;
		this.recipeService = recipeService;
	}
	
	
	@PostMapping(value = "/recipe", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Recipe> createRecipe(
			@RequestHeader String token,
			@RequestBody Recipe recipe
	) {
		logger.info("Received createRecipe request");
		
		User user = authService.validateToken(token);
		recipeService.createRecipe(user, recipe);
		
		logger.info("Created recipe '{}'", recipe.getName());
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(recipe);
	}
	
	
	@GetMapping(value = "/recipe")
	public ResponseEntity<List<Recipe>> getAllRecipes(
			@RequestHeader String token
	) {
		logger.info("Received getAllRecipes request");
		
		User user = authService.validateToken(token);
		List<Recipe> recipes = recipeService.getAllRecipes(); // TODO: get all recipes from user
		
		logger.info("Got all recipes");
		
		return ResponseEntity.ok(recipes);
	}
	
	
	@PutMapping(value = "/recipe/{recipeId}")
	public ResponseEntity<Recipe> updateRecipe(
			@PathVariable Long recipeId,
			@RequestHeader String token,
			@RequestBody Recipe recipe
	) {
		logger.info("Received updateRecipe request");
		
		User user = authService.validateToken(token);
		Recipe updatedRecipe = recipeService.updateRecipe(user.getId(), recipeId, recipe);
		
		logger.info("Updated recipe '{}'", recipeId);
		
		return ResponseEntity.ok(updatedRecipe);
	}
	
	
	@DeleteMapping(value = "/recipe/{recipeId}")
	public ResponseEntity<Void> deleteRecipe(
			@PathVariable Long recipeId,
			@RequestHeader String token
	) {
		logger.info("Received deleteRecipe request");
		
		User user = authService.validateToken(token);
		Recipe recipe = recipeService.getRecipe(recipeId);
		
		// Throw exception if user doesn't own recipe
		if (!user.getId().equals(recipe.getOwnerId())) {
			throw new NotOwnerException(user.getId());
		}
		
		recipeService.deleteRecipe(recipeId);
		logger.info("Deleted recipe '{}'", recipeId);
		
		return ResponseEntity.noContent().build();
	}
	
}
