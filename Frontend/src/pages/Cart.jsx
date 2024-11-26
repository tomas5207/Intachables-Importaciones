import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'; // Importa el componente Card de Bootstrap
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios'; 
import Swal from 'sweetalert2'; 
import { useAuth0 } from '@auth0/auth0-react';

const Cart = ({ cartItems, removeFromCart, setCart}) => {
  const navigate = useNavigate(); 
  const [preferenceId, setPreferenceId] = useState(null);// Inicializa el hook de navegación
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    // Inicializa Mercado Pago con tu public key
    initMercadoPago('APP_USR-08bc1ba8-ee93-4c2c-8405-cf9efc415eea');

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
    if (isAuthenticated) {
      const emailCliente = user?.email; // Obtener el email del usuario autenticado

      try {
        await axios.post('http://localhost:5000/pago/efectivo', {
          items: cartItems,
          total: totalAmount,
          emailCliente:emailCliente, // Usa el email del usuario autenticado
        });

        Swal.fire({
          title: '¡Solicitud de pago en efectivo procesada con éxito!',
          text: `Se ha enviado su solicitud de pago al email del vendedor. Por favor, pasar por la sede local o comunicarse con el vendedor.`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });

        setCart([]);
        navigate('/');
      } catch (error) {
        console.error('Error en el pago en efectivo:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al procesar el pago en efectivo.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    } else {
      Swal.fire({
        title: 'No estás logueado',
        text: 'Por favor, inicia sesión para poder hacer el pago en efectivo.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect();  // Redirigir al login si el usuario no está autenticado.
        }
      });;
    }
  };


  // Renderiza el componente
  return (
    <div style={{ textAlign: 'center', color: '#11456e' }}>
      {cartItems.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <>
          {/* Contenedor con scroll para las tarjetas de productos */}
          <div
            style={{
              maxHeight: '400px', // Limita la altura del contenedor
              overflowY: 'auto', // Habilita el scroll vertical
              margin: '0 auto', // Centra el contenedor
              width: '80%', // Ajusta el ancho del contenedor
            }}
          >
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
                  src={item.imagen} // Imagen del item
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
              <Button variant="success" onClick={handlePayInCash} style={{ marginTop: '20px', width: '400px', height: '45px' }}>
                Pagar en efectivo
              </Button>
              <div>
                <Wallet initialization={{ preferenceId: preferenceId }} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
  
  
};

export default Cart; // Exporta el componente Cart
