import * as types from './actionTypes';

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS_SUCCESS, comments };
}

export function scoreCommentSuccess(comment) {
  return { type: types.SCORE_COMMENT_SUCCESS, comment};
}

export function addCommentSuccess(comment) {
  return { type: types.ADD_COMMENT_SUCCESS, comment};
}

export function deleteCommentSuccess(comment) {
  return { type: types.DELETE_COMMENT_SUCCESS, comment};
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
      .then(res => {
        resolve(dispatch(addCommentSuccess(res.data)))
      })
      .catch((error) => {
        console.log(error);
      }),
  );
}

export function scoreComment(comment, data) {
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) =>
    axios({
      method: 'post',
      url: `http://localhost:3001/comments/${comment}`,
      data,
      headers: { Authorization: 'whatever-you-want' },
    })
      .then(res => {
        resolve(dispatch(scoreCommentSuccess(res.data)))
      })
      .catch((error) => {
        console.log(error);
      }),
  );
}

export function deleteComment(comment) {
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) =>
    axios({
      method: 'delete',
      url: `http://localhost:3001/comments/${comment}`,
      headers: { Authorization: 'whatever-you-want' },
    })
      .then(res => {
        resolve(dispatch(deleteCommentSuccess(res.data)))
      })
      .catch((error) => {
        console.log(error);
      }),
  );
}
