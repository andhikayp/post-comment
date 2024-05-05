/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { Snackbar } from '../../component/Snackbar';
import Api from '../../api';
import { Layout } from '../../component/Layout';
import { Comment } from './Comment';

const {
  fetchPostByPostId, fetchCommentsByPostId, fetchUserById, deleteCommentByCommentId,
  createdComment, editCommentByPostId
} = Api;

const DetailPost = (props) => {
  const { match } = props;
  const { id } = match.params;
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newComment, setNewComment] = useState('');

  setTimeout(() => {
    setIsShowSnackbar(false);
  }, 4000);

  const { data: post, isLoading: isLoadingPost } = useQuery(
    ['post'],
    () => fetchPostByPostId(id),
  );
  const { data, isLoading: isLoadingComments } = useQuery(
    ['comments'],
    () => fetchCommentsByPostId(id),
  );
  const { data: user, isLoading: isLoadingUser } = useQuery(
    ['user'],
    () => fetchUserById(post?.userId || 1),
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitAddComment = async (e) => {
    e.preventDefault();
    setSnackbarMessage('Success creating comment');
    setIsShowSnackbar(true);
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const newCommentPayload = {
      postId: id,
      name,
      email,
      body: newComment
    };
    await createdComment(newCommentPayload);
    setComments([
      ...comments,
      newCommentPayload
    ]);
  };

  const handleUpdateComment = (index, content) => {
    const updatedComments = [...comments];
    updatedComments[index].body = content;
    setComments(
      updatedComments
    );
    editCommentByPostId(updatedComments[index]);
  };

  useEffect(() => {
    setComments(data);
  }, [isLoadingComments]);

  const renderComment = (comment, index) => (
    <Comment
      comment={comment}
      index={index}
      handleShow={handleShow}
      setSnackbarMessage={setSnackbarMessage}
      setIsShowSnackbar={setIsShowSnackbar}
      handleUpdateComment={handleUpdateComment}
      setSelectedComment={setSelectedComment}
    />
  );

  const handleDeleteModal = async () => {
    await deleteCommentByCommentId(selectedComment);
    const updatedComments = [...comments];
    const index = updatedComments.findIndex((item) => item.id === selectedComment);
    if (index !== -1) {
      updatedComments.splice(index, 1);
    }
    setComments(updatedComments);
    setSnackbarMessage('Success deleting comment');
    setIsShowSnackbar(true);
    handleClose();
  };

  const renderModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure deleting this comment?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={handleDeleteModal}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderSnackbar = () => (
    <Snackbar message={snackbarMessage} />
  );

  const renderAddComment = () => {
    const handleChange = (e) => {
      setNewComment(e.target.value);
    };

    return (
      <div className="mb-3">
        <Form onSubmit={handleSubmitAddComment}>
          <Form.Group className="mb-3" controlId="newComment">
            <Form.Control name="newComment" type="text" value={newComment} placeholder="Enter comment" onChange={handleChange} />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  const renderContent = () => {
    const commentCount = comments?.length;

    return (
      <div>
        {isShowSnackbar && renderSnackbar()}
        {renderModal()}
        <Card>
          <Card.Body>
            <div className="mb-3">
              {`${post?.body}` || null}
            </div>
            {renderAddComment()}
            <div>
              <Card>
                <Card.Header>{`Comments (${commentCount})`}</Card.Header>
                <Card.Body>
                  {comments && comments.map(renderComment)}
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Layout
      title={`${post?.title}` || null}
      subtitle={`created by: ${user?.name}`}
      content={renderContent}
      isLoading={isLoadingPost && isLoadingComments}
    />
  );
};

export default DetailPost;
