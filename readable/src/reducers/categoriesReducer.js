import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loadCategoriesReducer(state = initialState.categories, action) {
  if(action.type === types.LOAD_CATEGORIES_SUCCESS){
    return {categories: action.categories};
  }

  return state;
}
