import React from 'react';
import PropTypes from 'prop-types';

const CategoryList = ({ categoriesList }) => (
  <div className="list-books">
    <div className="category-select">
      Selecione uma Categoria
      <ul>
        {categoriesList && categoriesList.categories.map(category => (
            <li key={category.name}><a href={`/${category.name}`}>{category.name}</a></li>
        ))}
      </ul>
    </div>
  </div>
);

CategoryList.propTypes = {
  categoriesList: PropTypes.array.isRequired,
};

export default CategoryList;
