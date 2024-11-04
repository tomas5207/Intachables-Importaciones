import ImageCarrusel from '../components/ImageCarrusel';
import React, { Component } from 'react'
import emailjs from "@emailjs/browser";
import { useAuth0 } from '@auth0/auth0-react';

const Contact = () => {
  
  const {isAuthenticated , user} = useAuth0();


    return (
      <>
      <ImageCarrusel PageRefrence="Contacto" reference="Home/Contacto"/>
      {isAuthenticated ? (
  <div
    align="center"
    className="contact-form-container"
    style={{
      maxWidth: "500px",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#fdcb5c",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h2 style={{ color: "white", marginBottom: "20px" }}>Contactame</h2>
    <form id="contact-form" method="post">
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
      maxWidth: "500px",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#fdcb5c",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h2 style={{ color: "white", marginBottom: "20px" }}>Contactame</h2>
    <form id="contact-form" method="post">
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