import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import axios from 'axios';
import CategoryList from './categories/CategoryList';
import CategoryPosts from './categories/CategoryPosts';
import PostDetail from './posts/PostDetail';
import './App.css';

import * as categoriesActions from './../actions/categoriesActions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadCategories();
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
        {categoriesList.categories && categoriesList.categories.map(category => (
          <div>
            <Route exact path={`/${category.name}`} key={category.name} render={() => (
              <CategoryPosts />
            )}/>
            <Route path={`/${category.name}/post/:id`} key={category.name} render={() => (
              <PostDetail />
            )}/>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(categoriesActions.loadCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
