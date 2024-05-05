import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Api from '../../api';
import { Layout } from '../../component/Layout';

const { fetchPhotosByAlbumId, fetchAlbumByAlbumId } = Api;

const Album = (props) => {
  const { match, history } = props;
  const { id } = match.params;
  const { data: photos, isLoading: isLoadingPhotos } = useQuery(
    ['photos'],
    () => fetchPhotosByAlbumId(id),
  );
  const { data: album, isLoading: isLoadingAlbum } = useQuery(
    ['album'],
    () => fetchAlbumByAlbumId(id),
  );

  const renderPhoto = (photo) => {
    const { title, thumbnailUrl, id: photoId } = photo;
    const handleOnclick = () => {
      history.push(`/photos/${photoId}`);
    };

    return (
      <Col key={photoId}>
        <Card onClick={handleOnclick} style={{ cursor: 'pointer' }}>
          <Card.Img variant="top" src={thumbnailUrl} />
          <Card.Body>
            <Card.Title>
              {title}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const renderContent = () => (
    <div>
      <Row xs={1} md={3} className="g-4">
        {!isLoadingPhotos && photos.map(renderPhoto)}
      </Row>
    </div>
  );

  return (
    <Layout
      title={`Album ${album?.title}`}
      content={renderContent}
      isLoading={isLoadingPhotos && isLoadingAlbum}
    />
  );
};

export default Album;
