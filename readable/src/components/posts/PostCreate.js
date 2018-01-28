import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as postsActions from './../../actions/postsActions';

class PostCreate extends Component{
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
    }
    this.handleStateChange = this.handleStateChange.bind(this);
    this.savePost = this.savePost.bind(this);
    this.setAndSavePost = this.setAndSavePost.bind(this);
    this.createUUiD = this.createUUiD.bind(this);
  }

  componentWillMount() {
    const categoriesList = this.props.categoriesList
    this.setState({
      categoriesList
    })
  }

  handleStateChange(event) {
    this.setState({ category: event.target.value })
  }

  componentWillReceiveProps({categoriesList}, nextContext) {
    this.setState({
      categoriesList: categoriesList
    })
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
          </div>
        </div>
        <div>
          <div>
            <label>Body</label>
          </div>
          <div>
            <textarea onChange={(event) => { this.setState({ body: event.target.value }); } }
                name="body"

                value={this.state.body}
                rows="10" cols="50"
                />
          </div>
        </div>
        <div>
          <div>
            <label>Author</label>
          </div>
          <div>
            <input onChange={(event) => { this.setState({ author: event.target.value }); } }
                name="author"

                type="text"
                value={this.state.author}
                />
          </div>
        </div>
        <div className="splitCreateTenant">
          <div className="itemCreateTenant">
               <label className="labelCreateTenant">Category</label>
           </div>
           <div className="itemCreateTenant">
            <div className="selectCreateTenant state">
                <select onChange={this.handleStateChange} name="state" id="">
                    <option value='-' disabled> -SELECT A CATEGORY- </option>
                    {categoriesList.categories.map(category => (
                      <option key={category.name} value={category.name}> {category.name} </option>
                    ))}
                </select>
              </div>
            <label className="errorCreateTenant">{this.state.stateHasError? 'Preenchimento obrigatório' : ''}</label>
          </div>
        </div>
        <div>
          <button className="addButton"  onClick={() => this.setAndSavePost() }>Save</button>
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
    createPost: (post) => dispatch(postsActions.createPost(post)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCreate));
