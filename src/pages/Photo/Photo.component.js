import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Api from '../../api';
import { Layout } from '../../component/Layout';

const { fetchPhoto } = Api;

const Album = (props) => {
  const { match } = props;
  const { id } = match.params;
  const { data: photo, isLoading } = useQuery(
    ['photo'],
    () => fetchPhoto(id),
  );

  const renderContent = () => (
    <div>
      <Row xs={1} className="g-4 mb-5">
        <Col key={photo?.photoId}>
          <Card>
            <Card.Img variant="top" src={photo?.url} />
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <Layout
      title={photo?.title}
      subtitle={`Album: ${photo?.albumTitle}`}
      content={renderContent}
      isLoading={isLoading}
    />
  );
};

export default Album;
