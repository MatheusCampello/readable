import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import CategoryList from './categories/CategoryList';
import CategoryPosts from './categories/CategoryPosts';
import PostDetail from './posts/PostDetail';
import PostCreate from './posts/PostCreate';
import CommentCreate from './comments/CommentCreate';
import CommentEdit from './comments/CommentEdit';
import './App.css';

import * as categoriesActions from './../actions/categoriesActions';
import * as postsActions from './../actions/postsActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };

    this.scorePost = this.scorePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillMount() {
    this.props.loadCategories();
    this.props.loadPosts()
  }

  loadCategoryPosts(category) {
    this.props.loadCategoryPosts(category);
  }

  scorePost(postId, option) {
    const data = { option: option};
    this.props.scorePost(postId, data);
  }

  deletePost(postId) {
    this.props.deletePost(postId);
  }

  render() {
    const categoriesList = this.props.categories;
    // console.log(this.props.posts)
    return (
      <div className="App">
        {categoriesList.categories &&
          <Route exact path="/" render={() => (
            <CategoryList categoriesList={categoriesList} posts={this.props.posts} scorePost={this.scorePost} deletePost={this.deletePost}/>
          )}/>
        }
        {categoriesList.categories.map(category => (
          <Route exact path={`/${category.name}`} key={category.name} render={() => (
            <CategoryPosts category={category.name} scorePost={this.scorePost} deletePost={this.deletePost}/>
          )}/>
        ))}
        {categoriesList.categories.map(category => (
          <Route exact path={`/${category.name}/post/:id`} key={category.name} render={() => (
            <PostDetail scorePost={this.scorePost}/>
          )}/>
        ))}
      <Route exact path={'/post/create'} render={() => (
        <PostCreate categoriesList={categoriesList}/>
      )}/>
      <Route exact path={'/post/:id/comment/create'} render={() => (
        <CommentCreate />
      )}/>
      <Route exact path={'/post/:id/comment/:cid/edit'} render={() => (
        <CommentEdit />
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
    scorePost: (postId, option) => dispatch(postsActions.scorePost(postId, option)),
    deletePost: (postId) => dispatch(postsActions.deletePost(postId)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
