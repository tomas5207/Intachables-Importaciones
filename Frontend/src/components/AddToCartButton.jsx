import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';  // Importar el hook de Auth0
import Swal from 'sweetalert2';

const AddToCartButton = ({ product, addToCart }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();  // Obtener la autenticación de Auth0
  const [countItem, setCountItem] = useState(1); // Empezar con 1 para que el usuario pueda agregar al menos un artículo.

  const handleAdd = () => {
    setCountItem(countItem + 1);
  };

  const handleRemove = () => {
    if (countItem > 1) {
      setCountItem(countItem - 1);
    }
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart({ ...product, quantity: countItem }); // Añadir al carrito con la cantidad seleccionada.
      setCountItem(1); 
      if(countItem === 1){
        Swal.fire({
          title: 'Añadido al carrito',
          text: `1 ${product.nombre} fue añadido al carrito.`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      else if(countItem > 1){
        Swal.fire({
          title: 'Añadido al carrito',
          text: `${countItem} ${product.nombre} fueron añadidos al carrito.`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
    } else {
      Swal.fire({
        title: 'No estás logeado',
        text: 'Por favor, inicia sesión para añadir productos al carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect();  // Redirigir al login si el usuario no está autenticado.
        }
      });
    }
  };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Button onClick={handleRemove} style={{ marginRight: '5px', backgroundColor: 'white', color: 'black' }}>-</Button>
      <span style={{ margin: '0 5px', color: 'white', fontWeight: 'bold' }}>{countItem}</span>
      <Button onClick={handleAdd} style={{ marginLeft: '5px', backgroundColor: 'white', color: 'black' }}>+</Button>
      <Button 
        variant="success" 
        onClick={handleAddToCart} 
        style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', marginTop: '10px' }}
      >
        Añadir al carrito
      </Button>
    </div>
  );
};

export default AddToCartButton;
