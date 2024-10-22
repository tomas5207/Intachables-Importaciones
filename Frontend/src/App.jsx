import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import ItemDetailContent from './pages/ItemDetailContent';
import Cart from './pages/Cart';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation(); // Hook para obtener la ruta actual

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      // Si el producto ya existe, sumar la cantidad.
      setCart(cart.map(item =>
        item.id === product.id ? { ...existingItem, quantity: existingItem.quantity + product.quantity } : item
      ));
    } else {
      // Si el producto no existe, agregarlo al carrito.
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
      {/* Renderizar el NavBar solo si no estamos en la página de Login */}
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home addToCart={addToCart} />} />
        <Route path='/producto/:id' element={<ItemDetailContent addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart cartItems={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
