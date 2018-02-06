import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function postsReducer(state = initialState.posts, action) {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      const defaultPosts = action.posts.sort((postA, postB) => postA.voteScore < postB.voteScore)
      return [...defaultPosts];
    case types.LOAD_CATEGORY_POSTS_SUCCESS:
      return [...action.posts];
    case types.SCORE_POST_SUCCESS:
      return state.map(post => post.id === action.post.id ?
          { ...post, voteScore: action.post.voteScore } :
        post);
    case types.DELETE_POST_SUCCESS:
      return state.map(post => post.id ===action.post.id ?
          { ...post, deleted: action.post.deleted } :
        post);
    case types.ORDER_POST_SUCCESS:
      if (action.order.includes('score')) {
        if (action.order.includes('+')) {
          const scoreAscPosts = state.sort((postA, postB) => postA.voteScore < postB.voteScore)
          return [...scoreAscPosts];
        } else {
          const scoreDescPosts = state.sort((postA, postB) => postA.voteScore > postB.voteScore)
          return [...scoreDescPosts];
        }
      } else {
        if (action.order.includes('-')) {
          const timeAscPosts = state.sort((postA, postB) => postA.timestamp < postB.timestamp)
          return [...timeAscPosts];
        } else {
          const timeDescPosts = state.sort((postA, postB) => postA.timestamp > postB.timestamp)
          return [...timeDescPosts];
        }
      }
    case types.EDIT_POST_SUCCESS:
      return state.map(post => post.id === action.post.id ?
          action.post :
        post);
    case types.DELETE_POST_COMMENT_SUCCESS:
      return state.map(post => post.id === action.comment.parentId ?
        { ...post, commentCount: post.commentCount - 1  } :
        post
      );
    case types.ADD_POST_COMMENT_SUCCESS:
      const postAux = state.map(post => post.id === action.comment.parentId ?
        { ...post, commentCount: post.commentCount + 1  } :
        post
      );
      console.log(postAux)
      return [...postAux]
    default:
      return state
  }
}
