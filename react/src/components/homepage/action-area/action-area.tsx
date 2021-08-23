import './action-area.css';
import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { NewRecipe } from '../../../model/Recipe';
import { createRecipe } from '../../../state/Effects';
import EditRecipeModal from '../edit-recipe-modal/edit-recipe-modal';

const mapDispatchToProps = (dispatch) => ({
	createRecipe: (recipe) => dispatch(createRecipe(recipe))
});


class ConnectedActionArea extends React.Component<any, any> {

	constructor(props) {
		super(props);

		this.state = {
			openModal: false,
		};
	}

	openModal = () => {
		this.setState({
			openModal: true
		});
	};

	handleClose = () => {
		this.setState({
			openModal: false,
		});
	};

	handleSubmit = (recipe: NewRecipe) => {
		this.props.createRecipe(recipe);
		this.handleClose();
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
				<EditRecipeModal
					open={this.state.openModal}
					recipe={null}
					onClose={this.handleClose}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}

const ActionArea = connect(null, mapDispatchToProps)(ConnectedActionArea);
export default ActionArea;
