import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function commentsReducer(state = initialState.comments, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS:
      const defaultComments = action.comments.sort((commA, commB) => commA.voteScore < commB.voteScore)
      return [...defaultComments];
    case types.ADD_COMMENT_SUCCESS:
      const comment = action.comment;
      return [...state, comment];
    case types.SCORE_COMMENT_SUCCESS:
      return state.map(comment => comment.id === action.comment.id ?
          { ...comment, voteScore: actionComment.voteScore } :
        comment);
    case types.DELETE_COMMENT_SUCCESS:
      const actionComment = action.comment;
      return state.map(comment => comment.id ===actionComment.id ?
          { ...comment, deleted: actionComment.deleted } :
        comment);
    default:
      return state
  }
}
