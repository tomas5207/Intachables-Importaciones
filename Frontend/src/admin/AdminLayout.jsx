import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Administración</h2>
        <nav>
          <ul>
            <li onClick={() => navigate('/admin')}>Inicio</li>
            <li onClick={() => navigate('/admin/productos')}>Productos</li>
            <li onClick={() => navigate('/admin/categorias')}>Categorías</li>
            <li onClick={() => navigate('/admin/subcategorias')}>Subcategorías</li>
            <li onClick={() => navigate('/')}>Volver al Home</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet /> {/* Renderiza el contenido de las rutas de administración */}
      </main>
    </div>
  );
}

export default AdminLayout;
