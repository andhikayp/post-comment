import React from 'react';

import { FormPost } from '../FormPost';

const CreatePost = (props) => {
  const { history } = props;

  const renderFormPost = () => (
    <FormPost
      history={history}
    />
  );

  return (
    <div>
      {renderFormPost()}
    </div>
  );
};

export default CreatePost;
