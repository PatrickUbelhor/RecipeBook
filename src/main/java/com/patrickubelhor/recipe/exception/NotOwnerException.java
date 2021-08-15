package com.patrickubelhor.recipe.exception;

public class NotOwnerException extends RuntimeException {
	
	public NotOwnerException(Long userId) {
		super(String.format("User with ID '%d' does not own this entity", userId));
	}
	
}
