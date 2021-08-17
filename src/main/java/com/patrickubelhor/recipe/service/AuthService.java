package com.patrickubelhor.recipe.service;

import com.patrickubelhor.recipe.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AuthService {
	
	@Value("${auth.url}")
	private String AUTH_URL;
	
	private final WebClient client;
	
	public AuthService() {
		this.client = WebClient.create();
	}
	
	
	public User validateToken(String token) {
		// TODO: throw proper exception based on response code
		// https://www.baeldung.com/spring-5-webclient
		return this.client.get()
				.uri(AUTH_URL)
				.header("token", token)
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToMono(User.class)
				.block();
	}
	
}
