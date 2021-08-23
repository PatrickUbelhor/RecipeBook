import React, { useEffect, useState } from 'react';
import ListInput from '../../shared/list-input/list-input';
import { NewRecipe } from '../../../model/Recipe';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

interface IProps {
	open: boolean;
	recipe: NewRecipe;
	onClose: () => void;
	onSubmit: (recipe: NewRecipe) => void;
}

const EMPTY_RECIPE: NewRecipe = new NewRecipe();

export default function EditRecipeModal(props: IProps) {

	const [recipe, setRecipe] = useState(props.recipe ?? EMPTY_RECIPE);

	useEffect(() => {
		setRecipe(props.recipe ?? EMPTY_RECIPE);
	}, [props.recipe])

	const handleChange = (event) => {
		const name = event.target.name;
		const value = (name === 'serveCount' || name === 'prepTimeMins' || name === 'totalTimeMins')
			? parseInt(event.target.value)
			: event.target.value;

		const nextRecipe: NewRecipe = {
			...recipe,
			[name]: value
		};

		setRecipe(nextRecipe);
	};

	return (
		<Dialog
			fullWidth={true}
			maxWidth="sm"
			open={props.open}
			onClose={props.onClose}
			aria-labelledby="add-recipe-form-title"
		>
			<DialogTitle id="add-recipe-form-title">Add Recipe</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					label="Recipe Name"
					name="name"
					onChange={handleChange}
					value={recipe.name}
					variant="outlined"
					margin="normal"
					fullWidth
					required
				/>
				<TextField
					label="Description"
					name="description"
					onChange={handleChange}
					value={recipe.description}
					variant="outlined"
					margin="normal"
					multiline
					fullWidth
				/>
				<TextField
					label="Serve Count"
					name="serveCount"
					onChange={handleChange}
					value={recipe.serveCount}
					variant="outlined"
					margin="normal"
					type="number"
					fullWidth
				/>
				<TextField
					label="Prep Time (minutes)"
					name="prepTimeMins"
					onChange={handleChange}
					value={recipe.prepTimeMins}
					variant="outlined"
					margin="normal"
					type="number"
					fullWidth
				/>
				<TextField
					label="Total Time (minutes)"
					name="totalTimeMins"
					onChange={handleChange}
					value={recipe.totalTimeMins}
					variant="outlined"
					margin="normal"
					type="number"
					fullWidth
				/>
				<ListInput
					label="Ingredients"
					name="ingredients"
					onChange={handleChange}
					value={recipe.ingredients}
				/>
				<ListInput
					label="Directions"
					name="directions"
					onChange={handleChange}
					value={recipe.directions}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={props.onClose}>Cancel</Button>
				<Button color="primary" onClick={() => props.onSubmit(recipe)}>Create</Button>
			</DialogActions>
		</Dialog>
	);
}
