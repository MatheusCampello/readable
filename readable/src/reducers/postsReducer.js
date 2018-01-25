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
    default:
      return state
  }
}
