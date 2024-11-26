import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const PurchaseComplete = ({ setCart, cartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePurchaseCompletion = async () => {
      try {
        // Vaciar el carrito
        setCart([]);

        // Actualizar stock
        const updateStockPromises = cartItems.map((item) => {
            if (item.quantity === 1) {
              // Usar la ruta para actualizar un único producto
              return axios.put(`http://localhost:5000/api/stock/${item.id}`, {
                cantidadComprada: item.quantity,
              });
            } else {
              // Usar la ruta para actualizar múltiples productos
              return axios.put(`http://localhost:5000/api/stock`, {
                productos: [
                  {
                    id: item.id,
                    cantidadComprada: item.quantity,
                  },
                ],
              });
            }
          });
          
          await Promise.all(updateStockPromises);

        // Mostrar confirmación
        Swal.fire({
          title: "Compra exitosa",
          text: "¡Gracias por tu compra! Tu carrito ha sido vaciado y el stock actualizado.",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => navigate("/")); // Redirigir al Home
      } catch (error) {
        console.error("Error al completar la compra:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al procesar la compra.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    };

    handlePurchaseCompletion();
  }, [cartItems, setCart, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Procesando tu compra...</h2>
    </div>
  );
};

export default PurchaseComplete;
