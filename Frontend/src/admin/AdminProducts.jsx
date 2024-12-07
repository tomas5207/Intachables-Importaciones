import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener productos desde el backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/producto");
      setProducts(response.data);
    } catch (err) {
      console.error("Error al obtener los productos:", err);
      setError(err.message);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar el producto ${
          products.find((product) => product.id === id).nombre
        }?`
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/producto/${id}`);
        alert("Producto eliminado correctamente");
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        alert("Ocurrió un error al eliminar el producto");
      }
    }
  };

  // Función para cambiar el estado de favorito
  const toggleFavorite = async (id, currentFavorite) => {
    try {
      const response = await axios.put(`http://localhost:5000/favorito/${id}`, {
        favorito: !currentFavorite,
      });
      // Actualizar la lista de productos con el nuevo valor de favorito
      setProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, favorito: response.data.producto.favorito }
            : product
        )
      );
    } catch (err) {
      console.error("Error al actualizar el favorito:", err);
      alert("Ocurrió un error al actualizar el favorito");
    }
  };

  // Mostrar el formulario para modificar un producto
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <ProductForm
        productToEdit={selectedProduct}
        onCancel={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        onSave={() => {
          setShowForm(false);
          fetchProducts();
        }}
      />
    );
  }

  return (
    <div className="admin-products">
      <h2>Lista de Productos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Descripción</th>
              <th>Color</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Favorito</th>
              <th>Categoría</th>
              <th>Subcategoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td>{product.descripción}</td>
                  <td>{product.color}</td>
                  <td>{product.codigo}</td>
                  <td>{product.precio}</td>
                  <td>{product.stock}</td>
                  <td>{product.favorito ? "Sí" : "No"}</td>
                  <td>{product.Categorium?.nombre || "Sin categoría"}</td>
                  <td>{product.SubCategorium?.nombre || "Sin subcategoría"}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(product)}
                      >
                        Modificar
                      </button>
                      <span
                        style={{
                          cursor: "pointer",
                          color: product.favorito ? "gold" : "gray",
                          fontSize: "1.5em",
                        }}
                        onClick={() =>
                          toggleFavorite(product.id, product.favorito)
                        }
                      >
                        ★
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No hay productos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <button
        className="btn btn-success"
        onClick={() => {
          setSelectedProduct(null);
          setShowForm(true);
        }}
      >
        Crear Nuevo Producto
      </button>
    </div>
  );
};

export default AdminProducts;
