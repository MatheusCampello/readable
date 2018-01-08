import { combineReducers } from 'redux';
import categories from './categoriesReducer';
import comments from './commentsReducer';
import posts from './postsReducer';

const rootReducer = combineReducers({
  alarms,
  attendance,
  attendants,
});

export default rootReducer;
