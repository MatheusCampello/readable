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
      comments: []
    };
  }

  componentWillMount() {
    console.log("WillMount",this.props.posts)
    axios({
      method: 'get',
      url: `http://localhost:3001/posts/${this.props.match.params.id}`,
      headers: { Authorization: 'whatever-you-want' },
    }).then(res => {
      this.props.loadComments(res.data.id).then((res) => {
        this.setState({ comments: res.comments.sort((commA, commB) => commA.voteScore < commB.voteScore) });
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log("WillReceive", nextProps.posts)
    this.setState({
      post: nextProps.posts.find(post => post.id === this.props.match.params.id)
    })
  }

  scoreComment(comment, option) {
    const data = { option: option}
    this.props.scoreComment(comment, data);
  }

  deleteComment(comment) {
    this.props.deleteComment(comment);
  }

  render() {
    const { post } = this.state;
    const commentStyle = {
      float: 'left',
      position: 'relative',
      width: '100%',
      textAlign: 'left',
    }
    // const comments = this.props.comments;
    return (
      <div>
        <PostTopic post={post} category={post.category} postDetails={true}/>

        <h4> <Link to={{ pathname: `/post/${post.id}/comment/create`, }}> Comment </Link>  </h4>
        <h2 style={commentStyle}> Comments </h2>
        {this.props.comments.length > 0 ? this.props.comments.filter(comment => comment.deleted === false).map((comment) => (
          <div key={comment.id} style={{border: '2px solid black', width: '50%'}}className='comment'>
            <div>
              {comment.body}
            </div>
            <div>
              Vote Score: {comment.voteScore} - Author {comment.author}
            </div>
            <div className="button" onClick={() => this.scoreComment(comment.id, 'upVote') }>UpVote</div>
            <div className="button" onClick={() => this.scoreComment(comment.id, 'downVote') }>DownVote</div>
            <div className="button" onClick={() => this.deleteComment(comment.id) }>Delete</div>
          </div>
        )) : (
          <div className='comment'> No comments yet </div>
        )}
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
    scoreComment: (comment, data) => dispatch(commentsActions.scoreComment(comment, data)),
    deleteComment: (comment) => dispatch(commentsActions.deleteComment(comment)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
