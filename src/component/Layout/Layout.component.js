import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { NavbarHeader } from '../NavbarHeader';

const Layout = (props) => {
  const {
    title, content, isLoading, subtitle
  } = props;

  const renderSubtitle = () => (
    <h6 className="mb-3">{!isLoading && subtitle}</h6>
  );

  return (
    <div>
      <NavbarHeader />
      <div className="mt-5">
        <Container>
          <h2 className="mb-3">
            {!isLoading && title}
            {subtitle && renderSubtitle()}
          </h2>
          <Row>
            <Col>
              {!isLoading && content()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
