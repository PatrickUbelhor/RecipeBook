package com.patrickubelhor.recipe.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.patrickubelhor.recipe.converter.StringListConverter;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.List;

/*
 * https://stackoverflow.com/questions/287201/how-to-persist-a-property-of-type-liststring-in-jpa
 */
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
	@Size(max = 2048)
	private String description;
	
	@Column(nullable = false)
	@Size(min = 1, max = 256)
	private String name;
	
	@Column
	@Min(1)
	private Integer serveCount;
	
	@Column
	@Min(0)
	private Integer prepTimeMins;
	
	@Column
	@Min(0)
	private Integer totalTimeMins;
	
	@Column
	@Convert(converter = StringListConverter.class)
	private List<String> ingredients;
	
	@Column
	@Convert(converter = StringListConverter.class)
	private List<String> directions;
	
	
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
	
	
	public List<String> getIngredients() {
		return ingredients;
	}
	
	
	public List<String> getDirections() {
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
	
	
	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}
	
	
	public void setDirections(List<String> directions) {
		this.directions = directions;
	}
	
}
