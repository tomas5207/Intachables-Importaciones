import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Card.Footer
      style={{
        backgroundColor: '#11456e',
        backgroundImage: 'url("https://www.increibles.com.uy/wp-content/uploads/2023/07/pie-2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container className='container'>
        <Row>
          {/* Productos */}
          <Col xs={12} md={4} className="footer-column mb-3">
            <h3 style={{ color: 'white', textDecoration: 'underline' }}>Productos:</h3>
            <ul className="list-unstyled">
              <li>
                <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
              </li>
              <li>
                <a href="/shop" style={{ color: 'white', textDecoration: 'none' }}>Tienda</a>
              </li>
            </ul>
          </Col>

          {/* Información */}
          <Col xs={12} md={4} className="footer-column mb-3">
            <h3 style={{ color: 'white', textDecoration: 'underline' }}>Información:</h3>
            <ul className="list-unstyled">
              <li>
                <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>Sobre Nosotros</a>
              </li>
              <li>
                <a href="/payform" style={{ color: 'white', textDecoration: 'none' }}>Formas de Pago</a>
              </li>
            </ul>
          </Col>

          {/* Redes y contactos */}
          <Col xs={12} md={4} className="footer-column mb-3">
            <h3 className="h-3" style={{ color: 'white', textDecoration: 'underline' }}>Redes y contactos:</h3>
            <p>Teléfono: 099 461 161</p>
            <ul className="list-unstyled">
              <li>
                <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contacto</a>
              </li>
            </ul>
            <div>
              <a
                href="https://www.facebook.com/IntachablesImportaciones"
                style={{ color: 'white', marginRight: '10px', fontSize: '20px' }}
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/intachables_uruguay/?hl=es-la"
                style={{ color: 'white', fontSize: '20px' }}
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </Card.Footer>
  );
};

export default Footer;
