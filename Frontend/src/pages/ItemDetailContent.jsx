import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddToCartButton from '../components/AddToCartButton'; // Ajusta la ruta según tu estructura

export const ItemDetailContent = ({ addToCart }) => {
  const [productsData, setProductsData] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // Primer llamada para obtener el producto
    axios.get(`http://localhost:5000/producto/${id}`)
      .then(response => {
        const producto = response.data;
        setProductsData(producto);
        console.log("Producto obtenido:", producto);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);


  useEffect(() => {
    // Realizar la solicitud de la categoría solo si el idCategoria está definido
    if (productsData.CategoriaId) {
      axios.get(`http://localhost:5000/categoria/${productsData.CategoriaId}`)
        .then(response => {
          setCategoriaNombre(response.data.nombre);
          console.log("Nombre de la categoría:", response.data.nombre);
        })
        .catch(error => {
          console.log("Error al obtener la categoría:", error);
        });
    }
  }, [productsData.CategoriaId]);

  return (
    <>
    <Card key={productsData.id} style={{ display: "flex", flexDirection: "column", alignItems: "left", width: "28rem", height: "500px" ,backgroundColor:"transparent", position: "relative", right: "500px"}}>
        <Card.Img variant="top" style={{ height: "100%", width: "100%", objectFit: "contain"}} src={productsData.imagen} />
    </Card>
    <Card style={{position: "relative", left: "120px", bottom:"450px" ,width: "40rem", height: "80px"}} className="customButtonDetail">
        <AddToCartButton product={productsData} addToCart={addToCart}/>
        <div style={{ color: "black", fontSize:"23px", position: "relative", bottom: "57px", left: "150px"}}>Cantidad en venta: <strong style={{ color: "#11456e"}}>{productsData.stock}</strong></div>
    </Card>
    <Card style={{position: "relative", left: "120px", bottom:"400px" ,width: "40rem", height: "80px"}} className="payBanner">
        <Card.Img src="../../public/efectivo.png" style={{ width: "50px", height: "50px", position: "relative", right: "10px", bottom: "20px"}}></Card.Img><span style={{ fontSize:"20px", position: "relative", bottom: "60px", right: "150px"}}>Paga en efectivo</span>
        <span style={{ fontSize:"20px", position: "relative", bottom: "88px"}}>O</span>
        <Card.Img src="../../public/mercadoPago.png" style={{ width: "50px", height: "50px", position: "relative", left: "33rem", bottom: "126px"}} ></Card.Img><span style={{ fontSize:"20px", position: "relative", bottom: "170px", left: "9rem"}}>con MercadoPago</span>
    </Card>
    <Link to = "/payform">
    <span style={{ fontSize:"20px", position: "relative", bottom: "400px", left: "120px", color: "#11456e"}}>Click aquí para más información sobre metodos de pago</span>
    </Link>
    <ul style={{ position: "relative", bottom: "350px", right: "80px" ,height: "80px", listStyleType: "none", padding: 0, margin: 0, textAlign: "left" }}>
    <li style={{ padding: 0, margin: 0 }}><a style={{ fontSize: "20px", color: "#11456e" }}>Precio por unidad: ${productsData.precio}</a></li>
    <li style={{ padding: 0, margin: 0 }}><a style={{ fontSize: "20px", color: "#11456e" }}>Código: #{productsData.codigo}</a></li>
    <li style={{ padding: 0, margin: 0 }}><a style={{ fontSize: "20px", color: "#11456e" }}>Categoría: {categoriaNombre}</a></li>
    <li style={{ padding: 0, margin: 0 }}><a style={{ fontSize: "20px", color: "#11456e" }}>Colores: {productsData.color}</a></li>
    </ul>
    <ul style={{ position: "relative",bottom: "200px", right: "550px" ,height: "80px", listStyleType: "none", padding: 0, margin: 0, textAlign: "left" }}>
    <h4 style={{ textDecoration:"underline", color: "#11456e"}}>Descripción:</h4>
    <p style={{ fontSize: "20px" , textAlign: "justify"}}>
      {productsData.descripción}
    </p>
    </ul>
    </>
  );
};

export default ItemDetailContent;
