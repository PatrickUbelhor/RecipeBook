import './recipe-detail.css';
import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { IAppState } from '../../model/State';
import { deleteRecipe } from '../../state/Effects';

const select = (state: IAppState) => ({
	recipe: state.selectedRecipe
});

const mapDispatchToProps = (dispatch) => ({
	deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe))
});

function ConnectedRecipeDetail(props) {
	if (props.recipe == null) return null;

	const ingredients = props.recipe.ingredients
		.map((ingredient, index) => (
			<li key={index}>{ingredient}</li>
		));

	const directions = props.recipe.directions
		.map((step, index) => (
			<li key={index}>{step}</li>
		));

	return (
		<Card variant="outlined" className="recipe-detail">
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">{props.recipe.name}</Typography>
				<Typography variant="body1" component="p">{props.recipe.description}</Typography>
				<Typography className="recipe-detail-ingredients-header" variant="h6" component="h6">Ingredients</Typography>
				<ul className="recipe-detail-ingredients-list">
					{ingredients}
				</ul>
				<Typography className="recipe-detail-ingredients-header" variant="h6" component="h6">Directions</Typography>
				<ul className="recipe-detail-ingredients-list">
					{directions}
				</ul>
			</CardContent>
		</Card>
	);
}

const RecipeDetail = connect(select, mapDispatchToProps)(ConnectedRecipeDetail);
export default RecipeDetail;
