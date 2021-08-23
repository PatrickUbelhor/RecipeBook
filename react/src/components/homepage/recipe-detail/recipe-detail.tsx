import './recipe-detail.css';
import React, { useState } from 'react';
import { Card, CardContent, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { NewRecipe } from '../../../model/Recipe';
import { IAppState } from '../../../model/State';
import { deleteRecipe, updateRecipe } from '../../../state/Effects';
import EditRecipeModal from '../edit-recipe-modal/edit-recipe-modal';

const select = (state: IAppState) => ({
	recipe: state.selectedRecipe
});

const mapDispatchToProps = (dispatch) => ({
	deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe)),
	updateRecipe: (id: number, recipe: NewRecipe) => dispatch(updateRecipe(id, recipe))
});

function ConnectedRecipeDetail(props) {
	const [isModalOpen, setModalOpen] = useState(false);

	if (props.recipe == null) return null;

	const handleClose = () => setModalOpen(false);
	const handleSubmit = (recipe: NewRecipe) => {
		props.updateRecipe(props.recipe.id, recipe);
		handleClose();
	}

	const ingredients = props.recipe.ingredients
		.map((ingredient, index) => (
			<li key={index}>{ingredient}</li>
		));

	const directions = props.recipe.directions
		.map((step, index) => (
			<li key={index}>{step}</li>
		));

	return (
		<>
			<Card variant="outlined" className="recipe-detail">
				<CardContent>
					<div className="recipe-detail-header">
						<Typography variant="h4" component="h2">{props.recipe.name}</Typography>
						<div className="recipe-detail-header-actions">
							<IconButton
								className="recipe-detail-header-actions-delete"
								aria-label="delete"
								size="small"
								onClick={() => props.deleteRecipe(props.recipe)}
							>
								<DeleteIcon fontSize="default"/>
							</IconButton>
							<IconButton
								className="recipe-detail-header-actions-edit"
								aria-label="edit"
								size="small"
								onClick={() => setModalOpen(true)}
							>
								<EditIcon/>
							</IconButton>
						</div>
					</div>
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
			<EditRecipeModal
				open={isModalOpen}
				recipe={props.recipe}
				onClose={handleClose}
				onSubmit={handleSubmit}
			/>
		</>
	);
}

const RecipeDetail = connect(select, mapDispatchToProps)(ConnectedRecipeDetail);
export default RecipeDetail;
