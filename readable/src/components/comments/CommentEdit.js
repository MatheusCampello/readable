import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as commentsActions from './../../actions/commentsActions';

class CommentEdit extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      timestamp: "",
      body: "",
      author: "",
      post: {},
    }
    this.saveComment = this.savePost.bind(this);
    this.setAndSaveComment = this.setAndSavePost.bind(this);
    this.createUUiD = this.createUUiD.bind(this);
  }

  componentWillMount() {
    if(Array.isArray(this.props.posts)) {
      const post = this.props.posts.find(post => post.id === this.props.match.params.id)
      this.setState({
        post
      });
    }
    if(Array.isArray(this.props.comments)) {
      const comment = this.props.comments.find(comment => comment.id === this.props.match.params.cid)
      this.setState({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(Array.isArray(nextProps.posts)) {
      this.setState({
        post: nextProps.posts.find(post => post.id === this.props.match.params.id)
      })
    }

    if(Array.isArray(nextProps.comments)) {
      const comment = nextProps.comments.find(comment => comment.id === nextProps.match.params.cid)
      this.setState({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author
      });
    }
  }

  createUUiD() {
    return 'xxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  editPost(commentId, data) {
    this.props.editComment(commentId, data).then(() => {
      this.props.history.push(`/${this.state.post.category}/post/${this.state.post.id}/`)
    });
  }

  setAndEditPost() {
    const timestamp = Date.now();
    const parentId = this.state.post.id
    const { id, body, author }  = this.state;
    const data = Object.assign({}, {
      timestamp,
      body,
      author
    });
    this.editPost(id, data);
  }

  render() {
    return (
      <div>
        <div className="">
          <div className="">
            <label className="">Body</label>
          </div>
          <div className="">
            <textarea onChange={(event) => { this.setState({ body: event.target.value }); } }
                name="body"
                className=""
                value={this.state.body}
                rows="10" cols="50"
                />
          </div>
        </div>
        <div className="">
          <div className="">
            <label className="">Author</label>
          </div>
          <div className="">
            <input onChange={(event) => { this.setState({ author: event.target.value }); } }
                name="author"
                className=""
                type="text"
                value={this.state.author}
                />
          </div>
        </div>
        <div className="">
          <button className="addButton"  onClick={() => this.setAndEditComment() }>Save</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: (commentId, data) => dispatch(commentsActions.editComment(commentId, data)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentEdit));
