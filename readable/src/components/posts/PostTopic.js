import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import './postTopic.css';

const PostTopic = ({ post, category, postDetails, deletePost }) => (
  <div key={post.id} className='border'>
    <div>
      {post.title} ---- {post.category}
      <div> {moment(post.timestamp).format("DD-MM-YYYY h:mm:ss") } </div>
    </div>
    {postDetails === false ? (
      <div>
        <Link to={`/${category}/${post.id}/`}>
          Comments: {post.commentCount}  - Vote Score: {post.voteScore} - Author: {post.author}
        </Link>
      </div>
    ) : (
      <div>
        <div> {post.body} </div>
        <div> Comments: {post.commentCount}  - Vote Score: {post.voteScore} - Author: {post.author} </div>
      </div>
    )}
    <Link to={`/post/edit/${post.id}`}>
      Edit
    </Link>
    <div className="deleteBtn" onClick={() => deletePost(post.id) }>Delete</div>
  </div>
);

PostTopic.defaultProps = {
  postDetails: false,
  category: ''
}

PostTopic.propTypes = {
  deletePost: PropTypes.func.isRequired,
  postDetails: PropTypes.bool,
  category: PropTypes.string,
  post: PropTypes.object,
};

export default PostTopic;
