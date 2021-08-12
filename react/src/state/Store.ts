import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IAppState } from '../model/State';
import { Action, Actions } from './Actions';

const INITIAL_STATE: IAppState = {
	theme: 'light',
	errorMessage: null,
	recipes: [],
	selectedRecipe: null
};

const reducer = function (state: IAppState = INITIAL_STATE, action: Action) {
	switch (action.type) {
		case Actions.SET_THEME_SUCCESS:
			return {
				...state,
				theme: action.payload
			};
		case Actions.SET_ERROR:
			return {
				...state,
				errorMessage: action.payload
			};
		case Actions.CLEAR_ERROR:
			return {
				...state,
				errorMessage: null
			};
		case Actions.GET_RECIPES_SUCCESS:
			return {
				...state,
				recipes: action.payload
			};
		case Actions.SELECT_RECIPE:
			return {
				...state,
				selectedRecipe: action.payload
			};
		case Actions.CREATE_RECIPE_SUCCESS:
			return {
				...state,
				recipes: state.recipes.concat(action.payload),
				selectedRecipe: action.payload
			};
		case Actions.DELETE_RECIPE_SUCCESS:
			return {
				...state,
				recipes: state.recipes.filter(recipe => recipe.id !== action.payload.id),
				selectedRecipe: (state.selectedRecipe.id === action.payload.id) ? null : state.selectedRecipe
			};
		default:
			return state;
	}
};

export const store = createStore(reducer, applyMiddleware(thunk));
