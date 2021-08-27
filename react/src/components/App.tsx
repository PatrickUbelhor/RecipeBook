import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../model/state.model';
import { initApp } from '../state/Effects';
import Header from './header/Header';
import Homepage from './homepage/homepage';
import LoginPage from './login-page/login-page';

const select = (state: IAppState) => ({
	theme: state.theme,
	self: state.self
});

const mapDispatchToProps = (dispatch) => ({
	initApp: () => dispatch(initApp()),
});

class ConnectedApp extends React.Component<any, any> {

	componentDidMount() {
		this.props.initApp();
	}

	render() {
		const currentPage = this.props.self ? <Homepage/> : <LoginPage/>

		return (
			<div className="wrapper">
				<Header/>
				{currentPage}
			</div>
		);
	}

}

const App = connect(select, mapDispatchToProps)(ConnectedApp);
export default App;
