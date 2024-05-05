import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Api from '../../api';
import { FormPost } from '../FormPost';

const { fetchPostByPostId } = Api;

const EditPost = (props) => {
  const { match, history } = props;
  const { id } = match.params;
  const { data: post, isLoading } = useQuery(
    ['post'],
    () => fetchPostByPostId(id),
  );

  const renderFormPost = () => (
    <FormPost
      title={post.title}
      content={post.body}
      id={id}
      history={history}
      isLoading={isLoading}
    />
  );

  return (
    <div>
      {!isLoading && renderFormPost()}
    </div>
  );
};

export default EditPost;
