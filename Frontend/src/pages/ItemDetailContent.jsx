import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddToCartButton from '../components/AddToCartButton'; // Ajusta la ruta según tu estructura

export const ItemDetailContent = ({ addToCart }) => {
  const [productsData, setProductsData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/producto/${id}`)
      .then(response => {
        setProductsData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <Card bg="primary" text="info" key={productsData.id} style={{ width: '19rem', height: "500px" }}>
        <Card.Img variant="top" style={{ height: "250px", width: "250px", display: "block", margin: "0 auto", objectFit: "cover" }} src={productsData.imagen} />
        <Card.Body>
        <Card.Title style={{ color: "white" }}>{productsData.nombre}</Card.Title>
        <div style={{ color: "white", fontSize: "15px" }}>{productsData.descripcion}</div>
        <div style={{ color: "white" }}><strong>Cantidad en venta:</strong> {productsData.stock}</div>
        <div style={{ color: "white" }}>$ {productsData.precio}</div>
        <AddToCartButton product={productsData} addToCart={addToCart} /> 
        </Card.Body>
    </Card>
  );
};

export default ItemDetailContent;
