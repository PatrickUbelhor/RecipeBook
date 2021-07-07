import './recipe-detail.css';
import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
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

	return (
		<Card variant="outlined" className="recipe-detail">
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">{props.recipe.name}</Typography>
				<Typography variant="body1" component="p">{props.recipe.description}</Typography>
			</CardContent>
		</Card>
	);
}

const RecipeDetail = connect(select, mapDispatchToProps)(ConnectedRecipeDetail);
export default RecipeDetail;
