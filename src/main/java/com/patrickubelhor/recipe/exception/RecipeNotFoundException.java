package com.patrickubelhor.recipe.exception;

public class RecipeNotFoundException extends RuntimeException {
	
	public RecipeNotFoundException(Long id) {
		super(String.format("Could not find recipe with ID '%d'", id));
	}
	
}
