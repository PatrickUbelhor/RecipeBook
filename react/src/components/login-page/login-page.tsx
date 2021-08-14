import './login-page.css';
import React from 'react';
import { Button, TextField } from '@material-ui/core';
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
			password: ''
		};
	}

	componentDidMount() {
		console.log('Auth endpoint: ');
		console.log(process.env.AUTH_SERVER_URL);
	}

	handleSubmit = () => {
		this.props.login(this.state.email, this.state.password);
	};

	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState(() => ({
			[name]: value
		}));
	};

	render() {
		return (
			<div className="login-page">
				<TextField
					autoFocus
					label="Email"
					name="email"
					value={this.state.email}
					onChange={this.onChange}
					variant="outlined"
					margin="normal"
					type="email"
				/>
				<TextField
					label="Password"
					name="password"
					value={this.state.password}
					onChange={this.onChange}
					variant="outlined"
					margin="normal"
					type="password"
				/>
				<Button onClick={this.handleSubmit}>Submit</Button>
			</div>
		);
	}

}

const LoginPage = connect(null, mapDispatchToProps)(ConnectedLoginPage);
export default LoginPage;
