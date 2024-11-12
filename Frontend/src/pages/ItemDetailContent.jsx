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
    <Card key={productsData.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "22rem", height: "600px" ,backgroundColor:"transparent"}}>
    <Card text="info" style={{ width: '19rem', height: "550px", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor:"white", position: "relative", bottom: "8.5px"}}>
        <Card.Img variant="top" style={{ height: "300px", width: "250px", objectFit: "contain" }} src={productsData.imagen} />
        <Card.Body style={{ textAlign: "center" }}>
            <Card.Title style={{ color: "black" }}>{productsData.nombre}</Card.Title>
            <div style={{ color: "black" }}><strong>Cantidad en venta:</strong> {productsData.stock}</div>
            <div style={{ color: "black" }}>$ {productsData.precio}</div>
        </Card.Body>
    </Card>
    <AddToCartButton product={productsData} addToCart={addToCart} />
</Card>
  );
};

export default ItemDetailContent;
