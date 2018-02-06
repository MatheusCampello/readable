import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostTopic from './../posts/PostTopic';

import * as postsActions from './../../actions/postsActions';

import './categoryPosts.css';

export class CategoryPosts extends React.Component {

  render() {
    const posts = this.props.posts.filter(post => post.category === this.props.category);
    console.log(this.props.posts)
    return (
      <div>
        <h1>Category: {this.props.category}</h1>
        <h4> <Link to={{ pathname: '/', }}> Back to Root </Link>  </h4>
        <h4> <Link to={{ pathname:'/post/create'}}> Post </Link>  </h4>
        <div className="categoryButton" onClick={() => this.props.order('score +') }>By Score Asc.</div>
        <div className="categoryButton" onClick={() => this.props.order('score -') }>By Score Desc.</div>
        <div className="categoryButton" onClick={() => this.props.order('time +') }>By Timestamp Asc.</div>
        <div className="categoryButton" onClick={() => this.props.order('time -') }>By Timestamp Desc.</div>
        {posts.length > 0 && posts.filter(post => post.deleted === false).map(post => (
          <div key={post.id} style={{'width': '100%', 'float': 'left'}}>
            <PostTopic post={post} category={this.props.category} deletePost={this.props.deletePost} />
            <div className="categoryButton" onClick={() => this.props.scorePost(post.id, 'upVote') }>UpVote</div>
            <div className="categoryButton" onClick={() => this.props.scorePost(post.id, 'downVote') }>DownVote</div>
          </div>
        ))}
      </div>
    );
  }
}

CategoryPosts.propTypes = {
  order: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  scorePost: PropTypes.func.isRequired,
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
