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
    this.setState({ posts: posts.filter(post => post.category === this.props.category) });

  }

  render() {
    const posts = this.state;
    return (
      <div>
        <h1>Category: {this.props.category}</h1>
        {posts && posts.posts.map(post => (
          <div key={post.id} style={{'width': '100%', 'float': 'left'}}>
            <PostTopic post={post} category={this.props.category} />
          </div>
        ))}
        <h4> <Link to={{ pathname:'/post/create'}}> Post </Link>  </h4>
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
