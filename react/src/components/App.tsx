import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../model/State';
import { getRecipes, initApp } from '../state/Effects';
import Header from './header/Header';
import RecipeDetail from './recipe-detail/recipe-detail';
import RecipeList from './recipe-list/RecipeList';

const select = (state: IAppState) => ({
	theme: state.theme,
	recipes: state.recipes
});

const mapDispatchToProps = (dispatch) => ({
	initApp: () => dispatch(initApp()),
	getRecipes: () => dispatch(getRecipes())
});

class ConnectedApp extends React.Component<any, any> {

	componentDidMount() {
		this.props.initApp();
		this.props.getRecipes();
		console.log(process.env.REACT_APP_SERVER_URL)
	}

	render() {
		return (
			<div className="wrapper">
				<Header/>
				<RecipeList recipes={this.props.recipes}/>
				<RecipeDetail recipe={null}/>
			</div>
		);
	}

}

const App = connect(select, mapDispatchToProps)(ConnectedApp);
export default App;
