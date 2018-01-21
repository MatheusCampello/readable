import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PostTopic from './../posts/PostTopic';

import * as postsActions from './../../actions/postsActions';
import * as commentsActions from './../../actions/commentsActions';

import './postDetail.css';

export class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      comments: [],
    };
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: `http://localhost:3001/posts/${this.props.match.params.id}`,
      headers: { Authorization: 'whatever-you-want' },
    }).then(res => {
      this.props.loadComments(res.data.id);
      this.setState({ post: res.data });
    })
  }

  render() {
    const { post } = this.state;
    const commentStyle = {
      float: 'left',
      position: 'relative',
      width: '100%',
      textAlign: 'left'
    }
    const comments = this.props.comments;
    return (
      <div>
        <PostTopic post={post} category={post.category} postDetails={true}/>

        <h2 style={commentStyle}> Comments </h2>
        {comments.length > 0 ? comments.map((comment) => (
          <div key={comment.id} className='comment'>
            <div>
              {comment.body}
            </div>
            <div>
              Vote Score: {comment.voteScore} - Author {comment.author}
            </div>
          </div>
        )) : (
          <div className='comment'> No comments yet </div>
        )

        }
      </div>
    );
  }
}

PostDetail.propTypes = {
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(postsActions.loadPosts()),
    loadComments: (post) => dispatch(commentsActions.loadComments(post)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
