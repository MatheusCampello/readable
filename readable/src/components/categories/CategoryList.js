import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostTopic from './../posts/PostTopic';

import './categoryList.css';

const CategoryList = ({ categoriesList, posts, scorePost, deletePost }) => (
  <div className="list-books">
    <div className="category-select">
      Select a Category
      <ul>
        {categoriesList && categoriesList.categories.map(category => (
            <li key={category.name}>
              <Link to={`/${category.name}`}>{category.name}</Link>
            </li>
        ))}
      </ul>
    </div>
    <h4> <Link to={{ pathname:'/post/create', state: { categoriesList: categoriesList}}}> Post </Link>  </h4>
    {posts && posts.filter(post => post.deleted === false).map(post => (
      <div key={post.id} style={{'width': '100%', 'float': 'left'}}>
        <PostTopic post={post} category={post.category} />
        <div className="categoryButton" onClick={() => scorePost(post.id, 'upVote') }>UpVote</div>
        <div className="categoryButton" onClick={() => scorePost(post.id, 'downVote') }>DownVote</div>
        <div className="categoryButton" onClick={() => deletePost(post.id) }>Delete</div>
      </div>
    ))}
  </div>
);

CategoryList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  scorePost: PropTypes.func.isRequired,
  categoriesList: PropTypes.shape({
      categories: PropTypes.array
  }).isRequired,
  posts: PropTypes.array.isRequired,
};

export default CategoryList;
