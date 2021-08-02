import React from 'react';
import { TextField } from '@material-ui/core';

export default class ListInput extends React.Component<any, any> {

	constructor(props) {
		super(props);

		this.state = {
			content: ['']
		};
	}

	onClickAway = (event) => {
		const index = parseInt(event.target.name);

		// If we just edited the last field (and it is non-empty), add a new empty field to the end
		if (index === this.state.content.length - 1) {
			if (this.state.content[index].length > 0) {
				this.setState(state => ({
					content: state.content.concat('')
				}));
			}

			return;
		}

		// Otherwise we edited a non-last field. If it is empty, then remove it
		if (this.state.content[index].length === 0) {
			this.setState(state => {
				const nextContent = state.content.slice();
				nextContent.splice(index, 1);

				return {
					content: nextContent
				};
			});
		}
	};

	onEdit = (event) => {
		const index = event.target.name;

		this.setState((state, props) => {
			const nextContent = state.content.slice();
			nextContent[index] = event.target.value;

		// TODO: since state is updated asychronously, this should probably be in a lifecycle hook
		// TODO: Strip spaces
			props.onChange(nextContent
				.map(entry => entry.trim())
				.filter(entry => entry.length > 0)
			);

			return {
				content: nextContent
			};
		});

	}

	render() {
		const fields = this.state.content.map((entry, index) => (
			<TextField
				key={index}
				name={index + ''}
				value={entry}
				onChange={this.onEdit}
				onBlur={this.onClickAway}
				multiline
				fullWidth
			/>
		))

		return (
			<div className="list-input">
				<div>Ingredients</div>
				{fields}
			</div>
		);
	}

}
