import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import CartWidget from './CartWidget';
import { useAuth0 } from '@auth0/auth0-react';



function NavBar () {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: '#fdcb5c' }}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                            src="../../public/Logo.jpg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="perro"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link style={{ color: 'white' }} href="/">Home</Nav.Link>
                            <Nav.Link style={{ color: 'white' }} href="/shop">Shop</Nav.Link>
                            <Nav.Link style={{ color: 'white' }} href="/about">About Us</Nav.Link>
                        </Nav>
                        <Nav>
                            {isAuthenticated ? (
                                <img 
                                    src={user.picture} 
                                    alt="Perfil" 
                                    onClick={() => logout({ returnTo: window.location.origin })} 
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
                                />
                            ) : (
                                <button onClick={() => loginWithRedirect()}>Login</button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <CartWidget />
            </Navbar>
        </>
    );
}

export default NavBar;
