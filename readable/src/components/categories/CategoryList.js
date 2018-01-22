import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryList = ({ categoriesList }) => (
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
  </div>
);

CategoryList.propTypes = {
  categoriesList: PropTypes.shape({
      categories: PropTypes.array
  }).isRequired,
};

export default CategoryList;
