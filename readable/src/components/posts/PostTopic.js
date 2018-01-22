import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './postTopic.css';

const PostTopic = ({ post, category, postDetails }) => (
  <div key={post.id} className='border'>
    <div>
      {post.title} ---- {post.category}
    </div>
    {postDetails === false ? (
      <Link to={`/${category}/post/${post.id}/`}>
        Comments: {post.commentCount}  - Vote Score: {post.voteScore} - Author: {post.author}
      </Link>
    ) : (
      <div>
        <div> {post.body} </div>
        <div> Comments: {post.commentCount}  - Vote Score: {post.voteScore} - Author: {post.author} </div>
      </div>
    )}
  </div>
);

PostTopic.defaultProps = {
  postDetails: false,
  category: ''
}

PostTopic.propTypes = {
  postDetails: PropTypes.bool,
  category: PropTypes.string,
  post: PropTypes.object,
};

export default PostTopic;
