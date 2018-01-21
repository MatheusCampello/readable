import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostTopic from './../posts/PostTopic';

import * as postsActions from './../../actions/postsActions';

import './categoryPosts.css';

export class CategoryPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    const posts = this.props.posts;
    this.props.loadCategoryPosts(this.props.category).then((res) => {
      this.setState({ posts: res.posts });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const posts = this.state;
    return (
      <div>
        <h1>Category: {this.props.category}</h1>
        {posts && posts.posts.map(post => (
          <PostTopic key={post.id} post={post} category={this.props.category} />
        ))}
      </div>
    );
  }
}

CategoryPosts.propTypes = {
  category: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategoryPosts: (category) => dispatch(postsActions.loadCategoryPosts(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts);
