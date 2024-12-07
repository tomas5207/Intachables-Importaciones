import React, { useState, useEffect } from "react";

const SubCategoryForm = ({ subCategory, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: subCategory?.id || null,
    nombre: subCategory?.nombre || "",
  });

  useEffect(() => {
    if (subCategory) {
      setFormData({
        id: subCategory.id,
        nombre: subCategory.nombre,
      });
    }
  }, [subCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="subcategory-form">
      <h2>{formData.id ? "Modificar Subcategoría" : "Crear Nueva Subcategoría"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de la Subcategoría</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="btn btn-primary">
            {formData.id ? "Modificar" : "Agregar"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubCategoryForm;
