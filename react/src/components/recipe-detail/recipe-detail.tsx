import './recipe-detail.css';
import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

// TODO: Make connected component. If selected recipe is null, output null. Else output Card.

export default function RecipeDetail(props) {
	const recipe = props.recipe;

	if (recipe == null) return null;

	return (
		<Card variant="outlined">
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
				<Typography variant="body1" component="p">{recipe.description}</Typography>
			</CardContent>
		</Card>
	);
}
