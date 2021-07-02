import './RecipeList.css';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import React from 'react';

export default function RecipeList(props) {

	const items = props.recipes.map(recipe => (
		<Card key={recipe.id} variant="outlined" className="recipe-list-card">
			<CardActionArea>
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
