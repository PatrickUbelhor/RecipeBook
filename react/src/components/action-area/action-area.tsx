import './action-area.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';

export class ActionArea extends React.Component<any, any> {

	constructor(props) {
		super(props);

		this.state = {
			openModal: false
		}
	}

	openModal = () => {
		this.setState(() => ({
			openModal: true
		}));
	}

	handleClose = () => {
		this.setState(() => ({
			openModal: false
		}));
	}

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
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={this.handleClose}>Cancel</Button>
						<Button color="primary" onClick={this.handleClose}>Create</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}

}
