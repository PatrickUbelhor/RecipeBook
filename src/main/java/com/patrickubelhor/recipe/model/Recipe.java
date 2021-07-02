package com.patrickubelhor.recipe.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "recipes")
public class Recipe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private Long id;
	
	@Column(nullable = false)
	private Long ownerId;
	
	@Column
	private String description;
	
	@Column(nullable = false)
//	@Size(min = 1, max = 256)
	private String name;
	
	@Column
//	@Min(1)
	private Integer serveCount;
	
	@Column
	private Integer prepTimeMins;
	
	@Column
	private Integer totalTimeMins;
	
	@Column
	private String ingredients;
	
	@Column
	private String directions;
	
	
	public Recipe() {}
	
	
	public Long getId() {
		return id;
	}
	
	
	public Long getOwnerId() {
		return ownerId;
	}
	
	
	public String getDescription() {
		return description;
	}
	
	
	public String getName() {
		return name;
	}
	
	
	public Integer getServeCount() {
		return serveCount;
	}
	
	
	public Integer getPrepTimeMins() {
		return prepTimeMins;
	}
	
	
	public Integer getTotalTimeMins() {
		return totalTimeMins;
	}
	
	
	public String getIngredients() {
		return ingredients;
	}
	
	
	public String getDirections() {
		return directions;
	}
	
	
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}
	
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	public void setName(String name) {
		this.name = name;
	}
	
	
	public void setServeCount(Integer serveCount) {
		this.serveCount = serveCount;
	}
	
	
	public void setPrepTimeMins(Integer prepTimeMins) {
		this.prepTimeMins = prepTimeMins;
	}
	
	
	public void setTotalTimeMins(Integer totalTimeMins) {
		this.totalTimeMins = totalTimeMins;
	}
	
	
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}
	
	
	public void setDirections(String directions) {
		this.directions = directions;
	}
	
}
