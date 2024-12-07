import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ onCancel, productToEdit = null, onFormSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    imagen: "",
    descripción: "",
    color: "",
    codigo: "",
    precio: 0,
    stock: 0,
    favorito: false,
    CategoriaId: 0,
    SubCategoriaId: 0,
  });

  // Rellenar los datos del producto si se recibe `productToEdit`
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        nombre: productToEdit.nombre || "",
        imagen: productToEdit.imagen || "",
        descripción: productToEdit.descripción || "",
        color: productToEdit.color || "",
        codigo: productToEdit.codigo || "",
        precio: productToEdit.precio || 0,
        stock: productToEdit.stock || 0,
        favorito: productToEdit.favorito || false,
        CategoriaId: productToEdit.CategoriaId || 0,
        SubCategoriaId: productToEdit.SubCategoriaId || 0,
      });
    }
  }, [productToEdit]);

  // Fetch categorías y subcategorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categoria");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subcategoria");
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error al cargar las subcategorías:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        // Actualizar producto existente
        await axios.put(`http://localhost:5000/producto/${productToEdit.id}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Producto modificado exitosamente");
      } else {
        // Crear un nuevo producto
        await axios.post("http://localhost:5000/producto", formData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Producto creado exitosamente");
      }

      if (onFormSubmit) onFormSubmit(); // Notificar al padre que se completó la acción
      onCancel(); // Volver a la lista
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert(error.response?.data?.message || "Ocurrió un error al procesar el producto");
    }
  };

  return (
    <div className="product-form">
      <h2>{productToEdit ? "Modificar Producto" : "Crear Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Imagen (URL)</label>
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="descripción"
            value={formData.descripción}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Código</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Favorito</label>
          <input
            type="checkbox"
            name="favorito"
            checked={formData.favorito}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select
            name="CategoriaId"
            value={formData.CategoriaId}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Seleccionar</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Subcategoría</label>
          <select
            name="SubCategoriaId"
            value={formData.SubCategoriaId}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Seleccionar</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.nombre}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-success">
          {productToEdit ? "Modificar Producto" : "Crear Producto"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
          style={{ marginLeft: "30px" }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
