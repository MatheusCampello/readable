import * as types from './actionTypes';

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS_SUCCESS, comments };
}

export function loadComments(post) {
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) =>
    axios({
      method: 'get',
      url: `http://localhost:3001/posts/${post}/comments`,
      headers: { Authorization: 'whatever-you-want' },
    })
      .then(res => resolve(dispatch(loadCommentsSuccess(res.data))))
      .catch((error) => {
        console.log(error);
      }),
  );
}

export function createComment(comment) {
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) =>
    axios({
      method: 'post',
      url: `http://localhost:3001/comments`,
      data: comment,
      headers: { Authorization: 'whatever-you-want' },
    })
      .then(res => resolve(dispatch(loadComments(res.data.parentId))))
      .catch((error) => {
        console.log(error);
      }),
  );
}
