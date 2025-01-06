import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Cart = ({ cartItems, removeFromCart, setCart }) => {
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
  });

  useEffect(() => {
    initMercadoPago('APP_USR-08bc1ba8-ee93-4c2c-8405-cf9efc415eea');

    const createPreference = async () => {
      if (!preferenceId) { // Evitar crear una preferencia si ya existe
        try {
          const response = await axios.post('https://intachables-importaciones-production.up.railway.app/pago/mercado', {
            ArrayItems: cartItems,
          });
          setPreferenceId(response.data.preferenceId);
        } catch (error) {
          console.error('Error al crear la preferencia:', error);
        }
      }
    };

    createPreference();
  }, [cartItems, preferenceId]);

  const totalAmount = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);

  const handlePayInCash = () => {
    setShowForm(true);
  };

  const confirmCashPayment = async () => {
    try {
      await axios.post('https://intachables-importaciones-production.up.railway.app/pago/efectivo', {
        items: cartItems,
        total: totalAmount,
        nombreCliente: userData.name,
        direccionCliente: userData.address,
        telefonoCliente: userData.phone,
        dia: userData.deliveryDate,
        paymentMethod: 'efectivo',
      });

      Swal.fire({
        title: '¡Compra registrada!',
        text: 'Se ha enviado un correo al vendedor con los detalles de la compra.',
        icon: 'success',
        confirmButtonText: 'Cerrar',
      });

      setCart([]);
      setShowForm(false);
      navigate('/');
    } catch (error) {
      console.error('Error en el pago en efectivo:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo registrar la compra. Inténtalo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  };


  return (
    <div style={{ textAlign: 'center', color: '#11456e' }}>
      {cartItems.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <>
          <div style={{ maxHeight: '400px', overflowY: 'auto', margin: '0 auto', width: '80%' }}>
            {cartItems.map((item, index) => (
              <Card key={index} text="info" style={{ margin: '10px', backgroundColor: '#11456e' }}>
                <Card.Img
                  variant="top"
                  style={{
                    height: '150px',
                    width: '150px',
                    display: 'block',
                    margin: '0 auto',
                    objectFit: 'cover',
                  }}
                  src={item.imagen}
                />
                <Card.Body>
                  <Card.Title style={{ color: 'white' }}>{item.nombre}</Card.Title>
                  <div style={{ color: 'white' }}>
                    <strong>Cantidad:</strong> {item.quantity}
                  </div>
                  <div style={{ color: 'white' }}>$ {item.precio * item.quantity}</div>
                  <Button variant="danger" onClick={() => removeFromCart(item)}>
                    Eliminar del carrito
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          <h3>Total a pagar: ${totalAmount}</h3>

          {totalAmount < 2000 ? (
            <div style={{ color: 'red', marginTop: '25px' }}>
              <p>El total mínimo para comprar productos es de $2000. Por favor ingrese más productos</p>
            </div>
          ) : (
            <>
              <Button
                variant="success"
                onClick={handlePayInCash}
                style={{ marginTop: '20px', height: '45px' }}
                className='btnefectivo'
              >
                Pagar en efectivo
              </Button>
              <div className='btnmercado'>
                <Wallet initialization={{ preferenceId: preferenceId }} />
              </div>
            </>
          )}
        </>
      )}

      {/* Modal para el formulario */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del comprador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
            <Form.Label>Día de recepción</Form.Label>
              <Form.Control
              as="select"
              value={userData.deliveryDate}
              onChange={(e) => setUserData({ ...userData, deliveryDate: e.target.value })}
              >
                  <option value="">Seleccione un día para recibir su pedido</option>
                  <option value="Lunes (9:00 a 12:00 hs)">Lunes (9:00 a 12:00 hs)</option>
                  <option value="Martes (9:00 a 12:00 hs)">Martes (9:00 a 12:00 hs)</option>
                  <option value="Miércoles (9:00 a 12:00 hs)">Miércoles (9:00 a 12:00 hs)</option>
                  <option value="Jueves (9:00 a 12:00 hs)">Jueves (9:00 a 12:00 hs)</option>
                  <option value="Viernes (9:00 a 12:00 hs)">Viernes (9:00 a 12:00 hs)</option>
                  <option value="Sábado (9:00 a 12:00 hs)">Sábado (9:00 a 12:00 hs)</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={confirmCashPayment}>
            Confirmar datos
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
