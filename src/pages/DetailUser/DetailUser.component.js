/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Api from '../../api';
import { Layout } from '../../component/Layout';

const {
  fetchUserById, fetchPostsById, fetchAlbumsById, deletePostByPostId
} = Api;

const DetailUser = (props) => {
  const userId = localStorage.getItem('userId');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { match, history } = props;
  const { id } = match.params;
  const { data: user, isLoading } = useQuery(
    ['user'],
    () => fetchUserById(id),
  );
  const { data, isLoading: isPostLoading } = useQuery(
    ['posts'],
    () => fetchPostsById(id),
  );
  const { data: albums, isLoading: isAlbumLoading } = useQuery(
    ['albums'],
    () => fetchAlbumsById(id),
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setPosts(data);
  }, [isPostLoading]);

  const isValidUser = userId == id;

  const renderAddButton = () => {
    const handleAddButton = () => {
      history.push('/posts/create');
    };

    return (
      <Button variant="success" size="sm" onClick={handleAddButton}>Create</Button>
    );
  };

  const renderEditButton = (selectedId) => {
    const handleEditButton = () => {
      history.push(`/posts/update/${selectedId}`);
    };

    return (
      <Button variant="warning" size="sm" onClick={handleEditButton}>Edit</Button>
    );
  };

  const renderDeleteButton = (selectedId) => {
    const handleDeleteButton = () => {
      handleShow();
      setSelectedPost(selectedId);
    };

    return (
      <Button variant="danger" size="sm" onClick={handleDeleteButton}>Delete</Button>
    );
  };

  const renderPostCard = (item) => {
    const { title, body, id: postId } = item;
    const handleOnclick = () => {
      history.push(`/posts/${postId}`);
    };

    return (
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text
            className="d-flex flex-column align-items-start"
          >
            {body}
            <Button variant="link" onClick={handleOnclick} className="px-0">Read more</Button>
            {isValidUser && (
              <div className="d-flex gap-2">
                {renderEditButton(postId)}
                {renderDeleteButton(postId)}
              </div>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    );
  };

  const renderAlbumCard = (item) => {
    const { title, id: albumId } = item;

    const handleOnclick = () => {
      history.push(`/albums/${albumId}`);
    };

    return (
      <Card className="mt-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title>{title}</Card.Title>
            <Button variant="primary" onClick={handleOnclick}>
              Detail
            </Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    );
  };

  const renderPosts = () => (
    <div className="mb-5">
      {isValidUser && renderAddButton()}
      {posts && posts.map(renderPostCard)}
    </div>
  );

  const renderAlbums = () => (
    <div className="mb-5">
      {albums.map(renderAlbumCard)}
    </div>
  );

  const renderModal = () => {
    const handleDeleteModal = async () => {
      await deletePostByPostId(selectedPost);
      const updatedPosts = [...posts];
      const index = updatedPosts.findIndex((item) => item.id === selectedPost);
      if (index !== -1) {
        updatedPosts.splice(index, 1);
      }
      setPosts(updatedPosts);
      handleClose();
    };

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure deleting this post?</Modal.Body>
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
  };

  const renderContent = () => {
    const {
      phone, website, company
    } = user;

    return (
      <div>
        <Row>
          <Col>Phone</Col>
          <Col>{`: ${phone}`}</Col>
        </Row>
        <Row>
          <Col>Website</Col>
          <Col>{`: ${website}`}</Col>
        </Row>
        <Row>
          <Col>Company</Col>
          <Col>{`: ${company.name}`}</Col>
        </Row>
        <Tabs
          defaultActiveKey="post"
          id="uncontrolled-tab-example"
          className="mb-3 mt-3"
        >
          <Tab eventKey="post" title="Posts">
            {!isPostLoading && renderPosts()}
          </Tab>
          <Tab eventKey="album" title="Albums">
            {!isAlbumLoading && renderAlbums()}
          </Tab>
        </Tabs>
        {renderModal()}
      </div>
    );
  };

  return (
    <Layout
      title={`${user?.username} | ${user?.name}`}
      content={renderContent}
      isLoading={isLoading}
    />
  );
};

export default DetailUser;
