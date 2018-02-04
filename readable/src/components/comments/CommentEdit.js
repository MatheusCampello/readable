import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
    this.editComment = this.editComment.bind(this);
    this.setAndEditComment = this.setAndEditComment.bind(this);
    this.createUUiD = this.createUUiD.bind(this);
  }

  componentWillMount() {
    const post = this.props.posts.find(post => post.id === this.props.match.params.id)
    this.setState({
      post
    });
    if (this.props.comments.length > 0) {
      const comment = this.props.comments.find(comment => comment.id === this.props.match.params.cid)
      this.setState({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author
      });
    } else {
      // Since the comment isn't loaded in the App.js but on the post page, I need to get the post, so... No redux here
      axios({
        method: 'get',
        url: `http://localhost:3001/comments/${this.props.match.params.cid}`,
        headers: { Authorization: 'whatever-you-want' },
      }).then(res => {
        this.setState({
          id: res.data.id,
          timestamp: res.data.timestamp,
          body: res.data.body,
          author: res.data.author
        });
      })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps)
    this.setState({
      post: nextProps.posts.find(post => post.id === this.props.match.params.id)
    })
  }

  createUUiD() {
    return 'xxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  editComment(commentId, data) {
    this.props.editComment(commentId, data).then(() => {
      this.props.history.push(`/${this.state.post.category}/post/${this.state.post.id}/`)
    });
  }

  setAndEditComment() {
    const timestamp = Date.now();
    const parentId = this.state.post.id
    const { id, body, author }  = this.state;
    const data = Object.assign({}, {
      timestamp,
      body,
      author
    });
    this.editComment(id, data);
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
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: (commentId, data) => dispatch(commentsActions.editComment(commentId, data)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentEdit));
