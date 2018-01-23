import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as commentsActions from './../../actions/commentsActions';

class CommentCreate extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      timestamp: "",
      title: "",
      body: "",
      author: "",
      category: "",
      categoriesList: [],
      post: {},
    }
    this.handleStateChange = this.handleStateChange.bind(this);
    this.saveComment = this.savePost.bind(this);
    this.setAndSaveComment = this.setAndSavePost.bind(this);
    this.createUUiD = this.createUUiD.bind(this);
  }

  componentWillMount() {
    const post = this.props.postsList.find(post => post.id === this.props.match.params.id)
    this.setState({
      post
    })
  }

  componentWillReceiveProps({categoriesList}, nextContext) {
    this.setState({
      post: this.props.postsList.find(post => post.id === this.props.match.params.id)
    })
  }

  handleStateChange(event) {
    this.setState({ category: event.target.value })
  }

  createUUiD() {
    return 'xxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  savePost(post) {
    this.props.createPost(post).then(() => {
      this.props.history.push(`/${this.state.category}`)
    });
  }

  setAndSavePost() {
    const id = this.createUUiD();
    const timestamp = Date.now();
    const { title, body, author, category }  = this.state;
    const post = Object.assign({}, {
      id,
      timestamp,
      title,
      body,
      author,
      category
    });
    this.savePost(post);
  }

  render() {
    const { categoriesList } = this.state
    return (
      <div>
        <div className="">
          <div className="">
            <label className="">Title</label>
          </div>
          <div className="">
            <input onChange={(event) => { this.setState({ title: event.target.value }); } }
                name="title"
                className=""
                type="text"
                value={this.state.title}
                />
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
          <button className="addButton"  onClick={() => this.setAndSaveComment() }>Save</button>
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
    createComment: (post) => dispatch(commentsActions.createComment(post)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentCreate));
