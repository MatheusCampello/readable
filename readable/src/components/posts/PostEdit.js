import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import * as postsActions from './../../actions/postsActions';

class PostEdit extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      timestamp: "",
      title: "",
      body: "",
      author: "",
      category: "",
      stateHasError: false,
    }
    this.editPost = this.editPost.bind(this);
    this.setAndEditPost = this.setAndEditPost.bind(this);
    this.createUUiD = this.createUUiD.bind(this);
    this.validatePost = this.validatePost.bind(this);
  }

  componentWillMount() {
    if(this.props.posts.length > 0) {
      const post = this.props.posts.find(post => post.id === this.props.match.params.id)
      this.setState({
        id: post.id,
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.posts.length > 0) {
      const post = nextProps.posts.find(post => post.id === this.props.match.params.id)
      this.setState({
        id: post.id,
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category ? post.category : 'react',
      });
    }
  }

  createUUiD() {
    return 'xxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  validatePost(post) {
    if (!post.title || !post.body) {
      return false
    }
    return true;
  }

  editPost(postId, data) {
    this.props.editPost(postId, data).then(() => {
      this.props.history.push(`/${this.state.category}/${this.state.id}/`)
    });
  }

  setAndEditPost() {
    const { id, timestamp, title, body, author, category }  = this.state;
    const post = Object.assign({}, {
      title,
      body,
    });

    if (this.validatePost(post)) {
      this.editPost(id, post);
    } else {
      this.setState({
        stateHasError: true
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <label>Title</label>
          </div>
          <div>
            <input onChange={(event) => { this.setState({ title: event.target.value }); } }
                name="title"

                type="text"
                value={this.state.title}
                />
            <label className="errorCreatePost">{this.state.stateHasError? 'Cannot be blank' : ''}</label>
          </div>
        </div>
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
          <button className="addButton"  onClick={() => this.setAndEditPost() }>Save</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: (postId, data) => dispatch(postsActions.editPost(postId, data)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEdit));
