import * as types from './actionTypes';

export function loadPostsSuccess(posts) {
  return { type: types.LOAD_POSTS_SUCCESS, posts };
}

export function loadCategoryPostsSuccess(posts) {
  return { type: types.LOAD_CATEGORY_POSTS_SUCCESS, posts };
}

export function loadPostDetailsSuccess(post) {
  return { type: types.LOAD_POST_DETAILS_SUCCESS, post};
}

export function loadPosts() {
  return (dispatch, getState, { axios }) => Promise.resolve(
    axios.get(
      'http://localhost:3001/posts', {
      headers: { 'Authorization': 'whatever-you-want' }
    }).then((res) =>{
      dispatch(loadPostsSuccess(res.data));
    }).catch((error) => {
      console.log(error);
    }),
  );
}

export function loadCategoryPosts(category) {
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) =>
    axios({
      method: 'get',
      url: `http://localhost:3001/${category}/posts`,
      headers: { Authorization: 'whatever-you-want' },
    })
      .then(res => resolve(dispatch(loadCategoryPostsSuccess(res.data))))
      .catch((error) => {
        console.log(error);
      }),
  );
}

export function loadPostDetails(post) {
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) =>
    axios({
      method: 'get',
      url: `http://localhost:3001/posts/${post}`,
      headers: { Authorization: 'whatever-you-want' },
    })
      .then(res => resolve(dispatch(loadPostDetailsSuccess(res.data))))
      .catch((error) => {
        console.log(error);
      }),
  );
}
