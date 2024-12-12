import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import CartWidget from './CartWidget';
import { useAuth0 } from '@auth0/auth0-react';

function NavBar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    // Determinar si el usuario actual es Admin
    const isAdmin = isAuthenticated && user?.email === 'jorcintomas@gmail.com';

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#11456e' }} className='navbar' collapseOnSelect>
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
                        <Nav.Link style={{ color: 'white' }} href="/shop">Tienda</Nav.Link>
                        <Nav.Link style={{ color: 'white' }} href="/about">Sobre Nosotros</Nav.Link>
                        <Nav.Link style={{ color: 'white' }} href="/payform">Formas de Pago</Nav.Link>
                        <Nav.Link style={{ color: 'white' }} href="/contact">Contacto</Nav.Link>
                        {isAdmin && (
                            <Nav.Link style={{ color: 'white' }} href="/admin">Administración</Nav.Link>
                        )}
                    </Nav>
                    <Nav className="d-flex align-items-center">
                        {isAuthenticated ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={user.picture}
                                    alt="Perfil"
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                    }}
                                />
                                <span style={{ color: 'white', fontSize: '14px' }}>{user.name}</span>
                            </div>
                        ) : (
                            <button onClick={() => loginWithRedirect()}>Login</button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
                <CartWidget />
        </Navbar>
    );
}

export default NavBar;
