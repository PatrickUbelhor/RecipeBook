import './homepage.css';
import React from 'react';
import { connect } from 'react-redux';
import { getRecipes } from '../../state/Effects';
import ActionArea from './action-area/action-area';
import RecipeDetail from './recipe-detail/recipe-detail';
import RecipeList from './recipe-list/recipe-list';

const mapDispatchToProps = (dispatch) => ({
	getRecipes: () => dispatch(getRecipes())
});

class ConnectedHomepage extends React.Component<any, any> {

	componentDidMount() {
		this.props.getRecipes();
	}

	render() {
		return (
			<div className="homepage">
				<ActionArea/>
				<div className="homepage-content">
					<RecipeList/>
					<RecipeDetail/>
				</div>
			</div>
		);
	}

}

const Homepage = connect(null, mapDispatchToProps)(ConnectedHomepage);
export default Homepage;
