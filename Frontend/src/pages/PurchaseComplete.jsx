import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const PurchaseComplete = ({ setCart, cartItems }) => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryDate: "",
  });
  const navigate = useNavigate();

  const handleAccept = async () => {
    try {
      // Enviar correo
      await axios.post("https://intachables-importaciones-production.up.railway.app/pago/email", {
        items: cartItems,
        nombreCliente: userData.name,
        direccionCliente: userData.address,
        telefonoCliente: userData.phone,
        dia: userData.deliveryDate,
      });

      // Vaciar el carrito
      setCart([]);

      // Mostrar confirmación
      Swal.fire({
        title: "¡Formulario enviado!",
        text: "Gracias por completar tus datos. Tu compra fue procesada con éxito.",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => navigate("/")); // Redirigir al Home
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar el formulario. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Muchas gracias por tu compra!</h1>
      <p>
        Completa este formulario con los siguientes datos para poder recibir tu
        pedido.
      </p>
      <form className="form">
        <div style={{ marginBottom: "15px" }}>
          <label>Nombre</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Teléfono</label>
          <input
            type="text"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Dirección</label>
          <input
            type="text"
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
        <label>Día de recepción</label>
          <select
          value={userData.deliveryDate}
          onChange={(e) => setUserData({ ...userData, deliveryDate: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          >
            <option value="">Seleccione un día para recibir su pedido</option>
            <option value="Lunes (9:00 a 12:00 hs)">Lunes (9:00 a 12:00 hs)</option>
            <option value="Martes (9:00 a 12:00 hs)">Martes (9:00 a 12:00 hs)</option>
            <option value="Miércoles (9:00 a 12:00 hs)">Miércoles (9:00 a 12:00 hs)</option>
            <option value="Jueves (9:00 a 12:00 hs)">Jueves (9:00 a 12:00 hs)</option>
            <option value="Viernes (9:00 a 12:00 hs)">Viernes (9:00 a 12:00 hs)</option>
            <option value="Sábado (9:00 a 12:00 hs)">Sábado (9:00 a 12:00 hs)</option>
            </select>
          </div>
        <button
          type="button"
          onClick={handleAccept}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default PurchaseComplete;
