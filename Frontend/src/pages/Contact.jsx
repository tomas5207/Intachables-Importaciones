import ImageCarrusel from '../components/ImageCarrusel';
import React, { Component } from 'react'
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useAuth0 } from '@auth0/auth0-react';

const Contact = () => {
  
  const {isAuthenticated , user} = useAuth0();

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Complete todos los campos por favor!",
      });
      return;
    }

    emailjs.sendForm("service_iz70z1f", "template_85jzk9m",
      e.target, "fa-DZWj3Ti3MRpGGh").then(()=>{
        Swal.fire({
        icon: "success",
        title: "Mensaje recibido!",
        text: "Gracias por contactarte con nosotros. Nos pondremos en contacto contigo lo antes posible.",
      });
      e.target.reset();
    }).catch(()=>{
      Swal.fire({
        icon: "error",
        title: "Lo siento :c",
        text: "Hubo un error al procesar su solicitud. Por favor, intente nuevamente.",
      });
    })

  }

    return (
      <>
      <ImageCarrusel PageRefrence="Contacto" reference="Home/Contacto"/>
      {isAuthenticated ? (
  <div
    align="center"
    className="contact-form-container"
    style={{
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#061c30",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h2 style={{ color: "white", marginBottom: "20px" }}>Contactame</h2>
    <form id="contact-form" method="post" onSubmit={sendEmail}>
      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label
          htmlFor="name"
          style={{
            display: "block",
            color: "white",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label
          htmlFor="email"
          style={{
            display: "block",
            color: "white",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label
          htmlFor="message"
          style={{
            display: "block",
            color: "white",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          cols="30"
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        ></textarea>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "white",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Enviar
      </button>
    </form>
  </div>
) : (
  <div
    align="center"
    className="contact-form-container"
    style={{
      width: "400px",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#061c30",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h2 style={{ color: "white", marginBottom: "20px" }}>Contactame</h2>
    <form id="contact-form" method="post" onSubmit={sendEmail}>
      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label
          htmlFor="name"
          style={{
            display: "block",
            color: "white",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label
          htmlFor="email"
          style={{
            display: "block",
            color: "white",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label
          htmlFor="message"
          style={{
            display: "block",
            color: "white",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          cols="30"
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        ></textarea>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "white",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Enviar
      </button>
    </form>
  </div>
)}
      </>
    )
}

export default Contact