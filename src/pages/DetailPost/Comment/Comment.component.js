import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

const Comment = (props) => {
  const {
    comment, index, handleShow, setSnackbarMessage, setIsShowSnackbar,
    handleUpdateComment, setSelectedComment
  } = props;
  const { name, body, id: commentId } = comment;

  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState();

  const handleOnclickDelete = () => {
    handleShow();
    setSelectedComment(commentId);
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleOnclickEdit = () => {
    setIsEditable(true);
    setContent(body);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const renderEditableForm = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      handleUpdateComment(index, content);
      handleCancel();
      setSnackbarMessage('Success updating comment');
      setIsShowSnackbar(true);
    };

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="content">
            <Form.Control name="content" type="text" value={content} placeholder="Enter comment" onChange={handleChange} />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          </div>
        </Form>
      </div>
    );
  };

  return (
    <div className="mb-4 d-flex">
      <div className="">
        <Image src="https://www.pngkey.com/png/detail/157-1579943_no-profile-picture-round.png" roundedCircle style={{ width: '50px', height: '50px', marginRight: '16px' }} />
      </div>
      <div className="flex-grow-1">
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <strong>{name}</strong>
              <div className="d-flex gap-2">
                <Button variant="warning" onClick={handleOnclickEdit}>
                  Edit
                </Button>
                <Button variant="danger" onClick={handleOnclickDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            {isEditable ? renderEditableForm() : body}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Comment;
