import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: category?.id || null,
    nombre: category?.nombre || "",
    subcategorias: category?.SubCategoria?.map((sub) => sub.nombre) || [],
  });
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    fetchSubcategories();
    if (category) {
      setFormData({
        id: category.id,
        nombre: category.nombre,
        subcategorias: category.SubCategoria?.map((sub) => sub.nombre),
      });
    }
  }, [category]);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subcategoria");
      setAvailableSubcategories(response.data);
    } catch (error) {
      console.error("Error al cargar las subcategorías:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubcategory = () => {
    if (
      selectedSubcategory &&
      !formData.subcategorias.includes(selectedSubcategory)
    ) {
      setFormData({
        ...formData,
        subcategorias: [...formData.subcategorias, selectedSubcategory],
      });
      setSelectedSubcategory("");
    }
  };

  const handleRemoveSubcategory = (subToRemove) => {
    setFormData({
      ...formData,
      subcategorias: formData.subcategorias.filter((sub) => sub !== subToRemove),
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };


  return (
    <div>
      <h3>{formData.id ? "Modificar Categoría" : "Crear Nueva Categoría"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategorías</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <select
              className="form-control"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="">Seleccionar una subcategoría</option>
              {availableSubcategories.map((sub) => (
                <option key={sub.id} value={sub.nombre}>
                  {sub.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddSubcategory}
              disabled={!selectedSubcategory}
            >
              Agregar
            </button>
          </div>
          <ul>
            {formData.subcategorias.map((sub, index) => (
              <li key={`${sub}-${index}`}>
                {sub}{" "}
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveSubcategory(sub)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
