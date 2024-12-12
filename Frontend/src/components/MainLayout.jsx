import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

function MainLayout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet /> {/* Renderiza el contenido de las rutas del sitio principal */}
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </>
  );
}

export default MainLayout;
