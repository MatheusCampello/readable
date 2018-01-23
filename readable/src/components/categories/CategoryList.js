import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostTopic from './../posts/PostTopic';

const CategoryList = ({ categoriesList, posts }) => (
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
    {posts && posts.map(post => (
      <div key={post.id} style={{'width': '100%', 'float': 'left'}}>
        <PostTopic post={post} category={post.category} />
      </div>
    ))}
  </div>
);

CategoryList.propTypes = {
  categoriesList: PropTypes.shape({
      categories: PropTypes.array
  }).isRequired,
  posts: PropTypes.array.isRequired,
};

export default CategoryList;
