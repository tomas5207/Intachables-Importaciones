import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'; // Importa el componente Card de Bootstrap
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios'; 

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate(); 
  const [preferenceId, setPreferenceId] = useState(null);// Inicializa el hook de navegación

  useEffect(() => {
    // Inicializa Mercado Pago con tu public key
    initMercadoPago('APP_USR-a8822305-0ee5-4564-93fc-1ee10adddb58');

    // Solicita el preferenceId al backend usando axios
    const createPreference = async () => {
      try {
        const response = await axios.post('http://localhost:5000/pago/mercado', {
          ArrayItems: cartItems
        });
        // Asegúrate de que el servidor devuelva preferenceId
        setPreferenceId(response.data.preferenceId);
      } catch (error) {
        console.error('Error al crear la preferencia:', error);
      }
    };

    createPreference();
  }, [cartItems]);

  // Calcula el monto total del carrito
  const totalAmount = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);


  // Función para manejar el pago en efectivo
  const handlePayInCash = async () => {
    try {
      const emailCliente = 'cliente@ejemplo.com'; // Reemplazar con el email real del cliente
      await axios.post('http://localhost:5000/pago/efectivo', {
        items: cartItems,
        total: totalAmount,
        emailCliente,
      });
      alert('Compra en efectivo realizada con éxito. Te redirigimos al Home.');
      navigate('/home'); // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error('Error en el pago en efectivo:', error);
      alert('Error al procesar el pago en efectivo.'); // Manejo de errores en el pago en efectivo
    }
  };


  // Renderiza el componente
  return (
    <div style={{ textAlign: 'center', color: '#fdcb5c' }}>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Card key={index} text="info" style={{ margin: '10px', backgroundColor: '#fdcb5c'}}>
              <Card.Img
                variant="top"
                style={{ height: '150px', width: '150px', display: 'block', margin: '0 auto', objectFit: 'cover' }}
                src={item.imagen} // Imagen del item
              />
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>{item.nombre}</Card.Title>
                <div style={{ color: 'white' }}><strong>Cantidad:</strong> {item.quantity}</div>
                <div style={{ color: 'white' }}>$ {item.precio * item.quantity}</div>
                <Button variant="danger" onClick={() => removeFromCart(item)}>Eliminar del carrito</Button>
              </Card.Body>
            </Card>
          ))}
          <h3>Total a pagar: ${totalAmount}</h3>
          <Button variant="success" onClick={handlePayInCash} style={{ marginTop: '20px' , width: '400px', height: '45px'}}>
            Pagar en efectivo
          </Button>
          <div>
          <Wallet initialization={{preferenceId: preferenceId}} />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; // Exporta el componente Cart
