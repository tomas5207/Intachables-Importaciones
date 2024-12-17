import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ItemListContainer from '../components/ItemListContainer';
import ImageCarrusel from '../components/ImageCarrusel';
import axios from 'axios';

export const Home = ({ addToCart }) => {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/producto')
            .then(response => {
                // Filtra los productos para obtener solo los favoritos
                const favoritos = response.data.filter(producto => producto.favorito === true);
                setProductsData(favoritos);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
        <ImageCarrusel PageRefrence="Inicio" reference=""/>
        <ItemListContainer greeting="Productos destacados de la semana:" productsData={productsData} addToCart={addToCart}/>
        <Card style={{ color: "white", width: "100%", padding: "20px", overflow: "hidden" }} className='cat-card'>
    <p style={{ fontSize: "20px", textAlign: "justify"}}>
        <img 
          src="../../public/gato.jpg" 
          alt="Imagen de gato" 
          style={{
            width: "25%",
            height: "120px",
            float: "left",       // Coloca la imagen a la izquierda
            marginRight: "15px", // Margen derecho para espacio con el texto
          }}
        />
        Bienvenido a la página oficial de Intachables-Importaciones, donde podrás comprar nuestros productos desde tu celular u ordenador
        desde la comodidad de tu hogar. No dudes en visitar nuestra <strong> "Tienda" </strong> para ver nuestro catalogo de productos y comprar alguno si es 
        de tu interes.
        </p>
      </Card>
      <br />
      <br />
      <Card style={{ color: "white", width: "100%"}} className='dog-card'>
        <p style={{ fontSize: "20px" , textAlign: "justify"}}>
        Para más información puedes visitar las secciones <strong> "Sobre Nosotros" </strong> y <strong> "Formas de Pago" </strong>
        donde podras obtener mas informacion sobre nosotros y el como pagar por los productos a nuestro disposición. También en caso 
        de querer contactarnos puede revisar nuestras redes sociales, llamar al número correspondiente en la página,envíar un mensaje por whatsapp,
        o contactarnos por correo electronico en la sección de <strong> "Contacto" </strong>. 
        <img 
          src="../../public/perro.JPG" 
          alt="Imagen de gato" 
          style={{
            width: "25%",
            height: "100px",
            float: "right",       // Coloca la imagen a la izquierda
            marginRight: "15px", // Margen derecho para espacio con el texto
          }}
        />
        </p>
      </Card>
        </>
    );
};

export default Home;
