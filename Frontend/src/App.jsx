import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Pay from './pages/Pay';
import ItemDetailContent from './pages/ItemDetailContent';
import Cart from './pages/Cart';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState(() => {
    // Cargar el carrito desde localStorage al iniciar la aplicación
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Actualizar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...existingItem, quantity: existingItem.quantity + product.quantity } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart); // Actualiza el estado del carrito y, a través de useEffect, el localStorage
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home addToCart={addToCart} />} />
          <Route path='/producto/:id' element={<ItemDetailContent addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart cartItems={cart} removeFromCart={removeFromCart} />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/payform' element={<Pay />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
