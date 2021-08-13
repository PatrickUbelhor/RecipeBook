import './recipe-list.css';
import { List, ListItem, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../model/State';
import { selectRecipe } from '../../state/Actions';

const select = (state: IAppState) => ({
	recipes: state.recipes,
	selectedRecipe: state.selectedRecipe
});

const mapDispatchToProps = (dispatch) => ({
	selectRecipe: (recipe) => dispatch(selectRecipe(recipe))
});

function ConnectedRecipeList(props) {

	const listItems = props.recipes.map(recipe => (
		<ListItem
			button
			key={recipe.id}
			selected={recipe.id === props.selectedRecipe?.id}
			onClick={() => props.selectRecipe(recipe)}
		>
			<div className="recipe-list-item-content">
				<Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
				<Typography variant="body2" color="textSecondary" component="p">{recipe.description}</Typography>
			</div>
		</ListItem>
	));

	return (
		<div className="recipe-list-wrapper">
			<List aria-label="My recipes">
				{listItems}
			</List>
		</div>
	);
}

const RecipeList = connect(select, mapDispatchToProps)(ConnectedRecipeList);
export default RecipeList;
