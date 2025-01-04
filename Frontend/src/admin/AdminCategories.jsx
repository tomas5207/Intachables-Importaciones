import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Obtener categorías del backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://intachables-importaciones-production.up.railway.app/categoria");
      setCategories(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error al obtener las categorías:", err);
      setError("Error al obtener las categorías");
    }
  };

  // Manejar eliminación de categoría
  const handleDeleteCategory = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      try {
        await axios.delete(`https://intachables-importaciones-production.up.railway.app/categoria/${id}`);
        setCategories(categories.filter((category) => category.id !== id));
      } catch (err) {
        console.error("Error al eliminar la categoría:", err);
        setError("No se pudo eliminar la categoría");
      }
    }
  };

  // Abrir formulario para crear nueva categoría
  const handleCreate = () => {
    setCurrentCategory(null);
    setShowForm(true);
  };

  // Abrir formulario para editar una categoría
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setShowForm(true);
  };

  // Guardar categoría (crear o editar)
  const handleSaveCategory = async (category) => {
    try {
      if (category.id) {
        // Editar categoría
        await axios.put(`https://intachables-importaciones-production.up.railway.app/categoria/${category.id}`, category);
      } else {
        // Crear nueva categoría
        await axios.post("https://intachables-importaciones-production.up.railway.app/categoria", category);
      }
      fetchCategories();
      setShowForm(false);
    } catch (err) {
      console.error("Error al guardar la categoría:", err);
      setError("Error al guardar la categoría");
    }
  };

  return (
    <>
      <div className="admin-categories">
        <h2 style={{ display: showForm ? "none" : "block" }}>Lista de Categorías</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!showForm ? (
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Subcategorías</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.nombre}</td>
                      <td>
                        {category.SubCategoria?.length > 0 ? (
                          <ul>
                            {category.SubCategoria.map((sub, idx) => (
                              <li key={idx}>{sub.nombre}</li>
                            ))}
                          </ul>
                        ) : (
                          "Sin subcategorías"
                        )}
                      </td>
                      <td>
                        {/* Botones de Modificar y Eliminar con margen */}
                        <button
                          className="btn btn-warning"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleEditCategory(category)}
                        >
                          Modificar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No hay categorías disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <CategoryForm
            category={currentCategory}
            onSave={handleSaveCategory}
            onCancel={() => setShowForm(false)}
          />
        )}
        <br/>
         {!showForm && (
          <div className="create-category-button">
            <button className="btn btn-success" onClick={handleCreate}>
              Crear Nueva Categoría
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCategories;
