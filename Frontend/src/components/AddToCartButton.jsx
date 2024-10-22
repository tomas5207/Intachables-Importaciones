import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const AddToCartButton = ({ product, addToCart }) => {
  const [countItem, setCountItem] = useState(1); // Empezar con 1 para que el usuario pueda agregar al menos un artículo.

  const handleAdd = () => {
    setCountItem(countItem + 1);
  };

  const handleRemove = () => {
    if (countItem > 1) { // Asegurarse de que no se puede restar menos de 1.
      setCountItem(countItem - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: countItem }); // Añadir al carrito con la cantidad seleccionada.
    setCountItem(1); // Reiniciar el contador después de agregar al carrito.
  };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Button onClick={handleRemove} style={{ marginRight: '5px' }}>-</Button>
      <span style={{ margin: '0 5px' }}>{countItem}</span>
      <Button onClick={handleAdd} style={{ marginLeft: '5px' }}>+</Button>
      <Button 
        variant="success" 
        onClick={handleAddToCart} 
        style={{ backgroundColor: "white", color: "black", fontWeight: "bold", marginTop: "10px" }}
      >
        Añadir al carrito
      </Button>
    </div>
  );
};

export default AddToCartButton;
