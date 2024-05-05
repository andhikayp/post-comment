import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useQuery } from '@tanstack/react-query';

import Api from '../../api';

const { fetchUserById } = Api;

const NavbarHeader = () => {
  const { data: userLogin, isLoading } = useQuery(
    ['userLogin'],
    () => fetchUserById(localStorage.getItem('userId')),
  );

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link>{!isLoading && `${userLogin?.username} | ${userLogin?.name}`}</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              {!isLoading && userLogin?.email}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
