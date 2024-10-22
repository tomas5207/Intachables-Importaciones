import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');  // Cambiado de email a usuario
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/user');
      const users = response.data;  // Asegúrate de acceder correctamente a los usuarios

      const validUser = users.find((user) => user.usuario === usuario && user.password === password);

      console.log('Login exitoso:', validUser);
      
      if (validUser) {
        // Redirigir a la página Home si el login es exitoso
        navigate('/home');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Error al procesar la solicitud');
    }
  };

  return (
    <div style={{ width: '400px',margin: '50px auto', backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px'}}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsuario">  {/* Cambiado de formEmail a formUsuario */}
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
}

export default Login;
