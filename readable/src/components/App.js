import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import axios from 'axios';
import CategoryList from './categories/CategoryList';
import CategoryPosts from './categories/CategoryPosts';
import PostDetail from './posts/PostDetail';
import PostCreate from './posts/PostCreate';
import './App.css';

import * as categoriesActions from './../actions/categoriesActions';
import * as postsActions from './../actions/postsActions';

class App extends Component {
  constructor(props) {
    super(props);

    this.loadCategoryPost
  }

  componentWillMount() {
    this.props.loadCategories();
    this.props.loadPosts();
  }

  loadCategoryPosts(category) {
    this.props.loadCategoryPosts(category);
  }

  render() {
    const categoriesList = this.props.categories;
    return (
      <div className="App">
        {categoriesList.categories &&
          <Route exact path="/" render={() => (
            <CategoryList categoriesList={categoriesList}/>
          )}/>
        }
        {categoriesList.categories.map(category => (
          <Route exact path={`/${category.name}`} key={category.name} render={() => (
            <CategoryPosts category={category.name} />
          )}/>
        ))}
        {categoriesList.categories.map(category => (
          <Route exact path={`/${category.name}/post/:id`} key={category.name} render={() => (
            <PostDetail />
          )}/>
        ))}
      <Route exact path={'/post/create'} render={() => (
        <PostCreate categoriesList={categoriesList}/>
      )}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(categoriesActions.loadCategories()),
    loadPosts: () => dispatch(postsActions.loadPosts()),
    loadCategoryPosts: (category) => dispatch(postsActions.loadCategoryPosts(category)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
