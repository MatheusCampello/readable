import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS:
      return [...action.comments];
    default:
      return state
  }
}
