import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import CartWidget from './CartWidget';



function NavBar () {
    return (
      <>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg" fixed="top">
          <Container fluid>
              <Navbar.Brand href="#home">
                  <img
                      src=" ../../public/perro.JPG"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="perro"
                  />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="/home">Home</Nav.Link>
                      <Nav.Link href="#shop">Shop</Nav.Link>
                      <Nav.Link href="#about">About Us</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
          <CartWidget />
      </Navbar>
  </>
    )
}

export default NavBar;