import * as types from './actionTypes';

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function loadCategories() {
  return (dispatch, getState, { axios }) => Promise.resolve(
    axios.get(
      'http://localhost:3001/categories', {
      headers: { 'Authorization': 'whatever-you-want' }
    }).then((res) =>{
      dispatch(loadCategoriesSuccess(res.data.categories));
    }).catch((error) => {
      console.log(error);
    }),
  );
}
