import { combineReducers } from 'redux';
import categories from './categoriesReducer';
import comments from './commentsReducer';
import posts from './postsReducer';

const rootReducer = combineReducers({
  categories,
  comments,
  posts,
});

export default rootReducer;
