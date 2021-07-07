import './RecipeList.css';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../model/State';
import { selectRecipe } from '../../state/Actions';

const select = (state: IAppState) => ({
	recipes: state.recipes
});

const mapDispatchToProps = (dispatch) => ({
	selectRecipe: (recipe) => dispatch(selectRecipe(recipe))
});

function ConnectedRecipeList(props) {

	const items = props.recipes.map(recipe => (
		<Card key={recipe.id} variant="outlined">
			<CardActionArea onClick={() => props.selectRecipe(recipe)}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
					<Typography variant="body2" color="textSecondary" component="p">{recipe.description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	));

	return (
		<div className="recipe-list-wrapper">
			{items}
		</div>
	);
}

const RecipeList = connect(select, mapDispatchToProps)(ConnectedRecipeList);
export default RecipeList;
