import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Api from '../../api';
import { Layout } from '../../component/Layout';
import { Snackbar } from '../../component/Snackbar';

const { createPost, editPostByPostId } = Api;

const FormPost = (props) => {
  const {
    id, title, content, isLoading
  } = props;
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    setFormData({
      title, content
    });
  }, [title]);

  const [isShowSnackbar, setIsShowSnackbar] = useState(false);

  setTimeout(() => {
    setIsShowSnackbar(false);
  }, 4000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title: newTitle, content: newContent } = formData;
    if (id) {
      await editPostByPostId(id, newTitle, newContent, userId);
      setIsShowSnackbar(true);
      return;
    }
    await createPost(newTitle, newContent, userId);
    setIsShowSnackbar(true);
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
      isLoading={isLoading}
    />
  );
};

export default FormPost;
