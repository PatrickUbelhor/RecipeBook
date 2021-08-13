import './list-input.css';
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
			props.onChange(nextContent
				.map(entry => entry.trim())
				.filter(entry => entry.length > 0)
			);

			return {
				content: nextContent
			};
		});
	}

	onChange = (event) => {
		console.log(event.target);
		const index = parseInt(event.target.name);
		let nextValue = this.props.value.slice();

		if (index === this.props.value.length) {
			nextValue.push('');
		}
		nextValue[index] = event.target.value;
		nextValue = nextValue
			// .map(entry => entry.trim())
			.filter(entry => entry.length > 0);

		this.props.onChange({
			target: {
				name: this.props.name,
				value: nextValue
			}
		});
	}

	render() {
		const fields = this.props.value.map((entry, index) => (
			<TextField
				key={index}
				name={index + ''}
				value={entry}
				onChange={this.onChange}
				margin="dense"
				multiline
				fullWidth
			/>
		));

		const size = this.props.value.length;
		fields.push(
			<TextField
				key={size}
				name={size + ''}
				value={''}
				onChange={this.onChange}
				margin="dense"
				multiline
				fullWidth
			/>
		);

		return (
			<div className={`list-input ${this.props.margin ?? 'dense'}`}>
				<div className="list-input-label">{this.props.label}</div>
				{fields}
			</div>
		);
	}

}
