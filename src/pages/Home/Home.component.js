import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';

import Api from '../../api';
import { Layout } from '../../component/Layout';

const { fetchUsers } = Api;

const Home = (props) => {
  const { history } = props;
  const { data: users, isLoading } = useQuery(
    ['users'],
    () => fetchUsers(),
  );

  const renderDetailUser = (user, key) => {
    const {
      username, name, phone, website, company, id
    } = user;

    const handleOnclick = () => {
      history.push(`/users/${id}`);
    };

    return (
      <Accordion.Item eventKey={key}>
        <Accordion.Header>{`${username} | ${name}`}</Accordion.Header>
        <Accordion.Body>
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
          <Button variant="primary" className="mt-3" onClick={handleOnclick}>
            Detail
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderContent = () => (
    <Accordion defaultActiveKey="0">
      {users.map(renderDetailUser)}
    </Accordion>
  );

  return (
    <Layout
      title="Users"
      content={renderContent}
      isLoading={isLoading}
    />
  );
};

export default Home;
