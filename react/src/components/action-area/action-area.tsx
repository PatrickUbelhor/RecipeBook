import './action-area.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { NewRecipe } from '../../model/Recipe';
import { createRecipe } from '../../state/Effects';
import ListInput from '../shared/list-input/list-input';

const mapDispatchToProps = (dispatch) => ({
	createRecipe: (recipe) => dispatch(createRecipe(recipe))
});

const EMPTY_RECIPE: NewRecipe = {
	name: '',
	description: '',
	serveCount: 1,
	prepTimeMins: 20,
	totalTimeMins: 60,
	ingredients: [],
	directions: ''
}

class ConnectedActionArea extends React.Component<any, any> {

	constructor(props) {
		super(props);

		this.state = {
			openModal: false,
			recipe: EMPTY_RECIPE
		};
	}

	openModal = () => {
		this.setState(() => ({
			openModal: true
		}));
	};

	handleClose = () => {
		this.setState(() => ({
			openModal: false,
			recipe: EMPTY_RECIPE
		}));
	};

	handleSubmit = () => {
		this.props.createRecipe(this.state.recipe);
		this.handleClose();
	}

	editField = (event) => {
		const name = event.target.name;
		const value = (name === 'serveCount' || name === 'prepTimeMins' || name === 'totalTimeMins')
			? parseInt(event.target.value)
			: event.target.value;

		this.setState((prevState) => ({
			recipe: {
				...prevState.recipe,
				[name]: value
			}
		}));
	};

	render() {
		return (
			<div className="action-area">
				<Button
					id="action-area-add-button"
					variant="contained"
					color="primary"
					onClick={this.openModal}
				>
					Add Recipe
				</Button>
				<Dialog
					fullWidth={true}
					maxWidth="sm"
					open={this.state.openModal}
					onClose={this.handleClose}
					aria-labelledby="add-recipe-form-title"
				>
					<DialogTitle id="add-recipe-form-title">Add Recipe</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							label="Recipe Name"
							name="name"
							onChange={this.editField}
							value={this.state.recipe.name}
							variant="outlined"
							margin="normal"
							fullWidth
							required
						/>
						<TextField
							label="Description"
							name="description"
							onChange={this.editField}
							value={this.state.recipe.description}
							variant="outlined"
							margin="normal"
							multiline
							fullWidth
						/>
						<TextField
							label="Serve Count"
							name="serveCount"
							onChange={this.editField}
							value={this.state.recipe.serveCount}
							variant="outlined"
							margin="normal"
							type="number"
							fullWidth
						/>
						<TextField
							label="Prep Time (minutes)"
							name="prepTimeMins"
							onChange={this.editField}
							value={this.state.recipe.prepTimeMins}
							variant="outlined"
							margin="normal"
							type="number"
							fullWidth
						/>
						<TextField
							label="Total Time (minutes)"
							name="totalTimeMins"
							onChange={this.editField}
							value={this.state.recipe.totalTimeMins}
							variant="outlined"
							margin="normal"
							type="number"
							fullWidth
						/>
						<ListInput
							label="Ingredients"
							name="ingredients"
							onChange={this.editField}
							value={this.state.recipe.ingredients}
						/>
						<TextField
							label="Directions"
							name="directions"
							onChange={this.editField}
							value={this.state.recipe.directions}
							variant="outlined"
							margin="normal"
							multiline
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={this.handleClose}>Cancel</Button>
						<Button color="primary" onClick={this.handleSubmit}>Create</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const ActionArea = connect(null, mapDispatchToProps)(ConnectedActionArea);
export default ActionArea;
