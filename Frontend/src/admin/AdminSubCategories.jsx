import React, { useEffect, useState } from "react";
import axios from "axios";
import SubCategoryForm from "./SubCategoryForm";

const AdminSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subcategoria");
      setSubCategories(response.data);
    } catch (err) {
      console.error("Error al obtener las subcategorías:", err);
      setError("Error al obtener las subcategorías");
    }
  };

  const handleCreate = () => {
    setCurrentSubCategory(null);
    setShowForm(true);
  };

  const handleEditSubCategory = (subCategory) => {
    setCurrentSubCategory(subCategory);
    setShowForm(true);
  };

  const handleDeleteSubCategory = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta subcategoría?")) {
      try {
        await axios.delete(`http://localhost:5000/subcategoria/${id}`);
        setSubCategories(subCategories.filter((sub) => sub.id !== id));
      } catch (err) {
        console.error("Error al eliminar la subcategoría:", err);
        setError("No se pudo eliminar la subcategoría");
      }
    }
  };

  const handleSaveSubCategory = async (subCategory) => {
    try {
      if (subCategory.id) {
        await axios.put(`http://localhost:5000/subcategoria/${subCategory.id}`, subCategory);
      } else {
        await axios.post("http://localhost:5000/subcategoria", subCategory);
      }
      fetchSubCategories();
      setShowForm(false);
    } catch (err) {
      console.error("Error al guardar la subcategoría:", err);
      setError("Error al guardar la subcategoría");
    }
  };

  return (
    <div className="admin-subcategories">
      <h2 style={{ display: showForm ? "none" : "block" }}>Lista de Subcategorías</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!showForm ? (
        <div>
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <tr key={sub.id}>
                      <td>{sub.nombre}</td>
                      <td>
                        <button className="btn btn-warning" style={{ marginRight: "10px" }} onClick={() => handleEditSubCategory(sub)}>
                          Modificar
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeleteSubCategory(sub.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No hay subcategorías disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <br/>
          <button className="btn btn-success" onClick={handleCreate}>
            Crear Nueva Subcategoría
          </button>
        </div>
      ) : (
        <SubCategoryForm
          subCategory={currentSubCategory}
          onSave={handleSaveSubCategory}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AdminSubCategories;
