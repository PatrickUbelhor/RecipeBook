import './login-page.css';
import React from 'react';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { createUser, login } from '../../state/Effects';

const mapDispatchToProps = (dispatch) => ({
	login: (email: string, password: string) => dispatch(login(email, password)),
	createUser: (email: string, username: string, password: string) => dispatch(createUser(email, username, password))
});

class ConnectedLoginPage extends React.Component<any, any> {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			// confirmPassword: '',
			isCreateMode: false
		};
	}

	componentDidMount() {
		console.log('Auth endpoint: ');
		console.log(process.env.REACT_APP_AUTH_SERVER_URL);
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.state.isCreateMode) {
			this.props.createUser(this.state.email, this.state.username, this.state.password);
			return;
		}

		this.props.login(this.state.email, this.state.password);
	};

	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState(() => ({
			[name]: value
		}));
	};

	onModeChange = () => {
		this.setState((state) => ({
			isCreateMode: !state.isCreateMode
		}));
	}

	render() {
		const emailField = (
			<TextField
				autoFocus
				label="Email"
				name="email"
				value={this.state.email}
				onChange={this.onChange}
				variant="outlined"
				margin="dense"
				type="email"
			/>
		);

		const usernameField = (
			<TextField
				label="Username"
				name="username"
				value={this.state.username}
				onChange={this.onChange}
				variant="outlined"
				margin="dense"
				type="text"
			/>
		);

		const passwordField = (
			<TextField
				label="Password"
				name="password"
				value={this.state.password}
				onChange={this.onChange}
				variant="outlined"
				margin="dense"
				type="password"
			/>
		);

		/*const confirmPasswordField = (
			<TextField
				label="Confirm Password"
				name="confirmPassword"
				value={this.state.confirmPassword}
				onChange={this.onChange}
				variant="outlined"
				margin="dense"
				type="password"
			/>
		);*/

		return (
			<div className="login-page">
				<Card variant="elevation">
					<CardContent>
						<form className="login-page-form" onSubmit={this.handleSubmit}>
							<Typography className="login-page-form-title" variant="h4">
								{this.state.isCreateMode ? 'Create Account' : 'Login'}
							</Typography>
							{emailField}
							{this.state.isCreateMode ? usernameField : null}
							{passwordField}
							{/*{this.state.isCreateMode ? confirmPasswordField : null}*/}
							<Button
								className="login-page-form-submit-button"
								onClick={this.handleSubmit}
								color="primary"
								variant="contained"
								type="submit"
							>{this.state.isCreateMode ? 'Create' : 'Login'}</Button>
						</form>
					</CardContent>
					<CardActions>
						<div
							className="login-page-create-link"
							onClick={this.onModeChange}
						>{this.state.isCreateMode ? 'Go to login' : 'Create an account'} &gt;</div>
					</CardActions>
				</Card>
			</div>
		);
	}

}

const LoginPage = connect(null, mapDispatchToProps)(ConnectedLoginPage);
export default LoginPage;
