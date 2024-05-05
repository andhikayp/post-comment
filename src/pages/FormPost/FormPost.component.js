import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useQuery } from '@tanstack/react-query';

import Api from '../../api';
import { Layout } from '../../component/Layout';
import { Snackbar } from '../../component/Snackbar';

const { createPost, editPostByPostId, fetchPostByPostId } = Api;

const FormPost = (props) => {
  const { match, history } = props;
  const { id } = match.params;
  const userId = localStorage.getItem('userId');
  const { data: post, isLoading } = useQuery(
    ['post'],
    () => fetchPostByPostId(id),
  );

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    setFormData({
      ...formData,
      title: post?.title,
      content: post?.body,
    });
  }, [isLoading]);

  const [isShowSnackbar, setIsShowSnackbar] = useState(false);
  setTimeout(() => {
    setIsShowSnackbar(false);
  }, 4000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content } = formData;
    if (id) {
      await editPostByPostId(id, title, content, userId);
      setIsShowSnackbar(true);
      return;
    }
    await createPost(title, content, userId);
    setIsShowSnackbar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const renderSnackbar = () => {
    let message = 'Success creating post';
    if (id) {
      message = 'Success updating post';
    }

    return (
      <Snackbar message={message} />
    );
  };

  const renderContent = () => (
    <div>
      {isShowSnackbar && renderSnackbar()}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" value={formData.title} placeholder="Enter title" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control name="content" type="text" value={formData.content} placeholder="Enter content" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  );

  return (
    <Layout
      title={id ? 'Update Post' : 'Create Post'}
      content={renderContent}
      isLoading={false}
    />
  );
};

export default FormPost;
