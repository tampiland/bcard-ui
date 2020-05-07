import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <Navbar
      variant='dark'
      bg='dark'
      expand='sm'
      className='justify-content-between'>
      <LinkContainer to='/'>
        <Navbar.Brand>BizCard</Navbar.Brand>
      </LinkContainer>
      <Nav className='d-flex flex-row flex-nowrap'>
        <LinkContainer to='/all'>
          <Nav.Link>
            <Button variant='secondary' size='sm' className='mx-1'>
              List all
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/new'>
          <Nav.Link>
            <Button variant='secondary' size='sm' className='mx-1'>
              Create new
            </Button>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
