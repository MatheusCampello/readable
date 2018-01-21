import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return [...action.posts];
    case types.LOAD_CATEGORY_POSTS_SUCCESS:
      return [...action.posts];
    default:
      return state
  }
}
