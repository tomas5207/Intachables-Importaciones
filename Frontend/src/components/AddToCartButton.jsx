import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';  
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';

const AddToCartButton = ({ product, addToCart }) => { 
  const [countItem, setCountItem] = useState(1); 

  const handleAdd = () => {
    setCountItem(countItem + 1);
  };

  const handleRemove = () => {
    if (countItem > 1) {
      setCountItem(countItem - 1);
    }
  };

  const handleAddToCart = () => {
    
      addToCart({ ...product, quantity: countItem }); 
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
    } 

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Card style={{ backgroundColor: 'white', padding: '5px', display: 'inline-block'}}>
      <Button onClick={handleRemove} style={{  backgroundColor: 'white', color: 'darkgrey' , width: '1px' ,border: 'none' }}>-</Button>
      <span style={{ paddingLeft: '5px', color: 'black', fontWeight: 'bold' }}>{countItem}</span>
      <Button onClick={handleAdd} style={{ backgroundColor: 'white', color: 'darkgrey', width: '1px' , border: 'none' }}>+</Button>
      </Card>
      <Button 
        variant="success" 
        onClick={handleAddToCart} 
        style={{ fontWeight: 'bold', marginLeft: '10px' }}
      >
        Añadir al carrito
      </Button>
    </div>
  );
};

export default AddToCartButton;
