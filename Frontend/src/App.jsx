import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Pay from './pages/Pay';
import ItemDetailContent from './pages/ItemDetailContent';
import Cart from './pages/Cart';
import PurchaseComplete from './pages/PurchaseComplete';
import AdminLayout from './admin/AdminLayout';
import AdminPage from './admin/AdminPage';
import AdminProducts from './admin/AdminProducts';
import AdminCategories from './admin/AdminCategories';
import AdminSubCategories from './admin/AdminSubCategories';
import MainLayout from './components/MainLayout';
import NoLayout from './components/NoLayout'; // Nuevo layout
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
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
    setCart(updatedCart);
  };

  return (
    <Routes>
      {/* Layout principal */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/producto/:id" element={<ItemDetailContent addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} setCart={setCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payform" element={<Pay />} />
      </Route>

      {/* Layout sin NavBar ni Footer */}
      <Route element={<NoLayout />}>
        <Route
          path="/paymentSuccess"
          element={<PurchaseComplete setCart={setCart} cartItems={cart} />}
        />
      </Route>

      {/* Layout de administración */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/productos" element={<AdminProducts />} />
        <Route path="/admin/categorias" element={<AdminCategories />} />
        <Route path="/admin/subcategorias" element={<AdminSubCategories />} />
      </Route>
    </Routes>
  );
}

export default App;
