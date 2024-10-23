import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // No más BrowserRouter aquí
import Home from './pages/Home';
import NavBar from './components/NavBar';
import ItemDetailContent from './pages/ItemDetailContent';
import Cart from './pages/Cart';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...existingItem, quantity: existingItem.quantity + product.quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
    console.log("Producto añadido al carrito:", product);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
    console.log("Producto eliminado del carrito:", product);
  };

  return (
    <>
      <NavBar /> {/* El NavBar siempre se renderiza ahora */}
      <Routes>
        <Route path='/' element={<Home addToCart={addToCart} />} />
        <Route path='/producto/:id' element={<ItemDetailContent addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart cartItems={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </>
  );
}

export default App;
