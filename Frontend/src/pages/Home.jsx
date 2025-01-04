import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ItemListContainer from '../components/ItemListContainer';
import ImageCarrusel from '../components/ImageCarrusel';
import axios from 'axios';

export const Home = ({ addToCart }) => {
    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]); // Nuevo estado para las categorías

    useEffect(() => {
        // Cargar productos favoritos
        axios.get('https://intachables-importaciones-production.up.railway.app/producto')
            .then(response => {
                const favoritos = response.data.filter(producto => producto.favorito === true);
                setProductsData(favoritos);
            })
            .catch(error => {
                console.log("Error al obtener productos:", error);
            });

        // Cargar categorías
        axios.get('https://intachables-importaciones-production.up.railway.app/categoria')
            .then(response => {
                setCategoriesData(response.data);
            })
            .catch(error => {
                console.log("Error al obtener categorías:", error);
            });
    }, []);

    return (
        <>
            <ImageCarrusel PageRefrence="Inicio" reference="" />
            <ItemListContainer 
                greeting="Productos destacados de la semana:" 
                productsData={productsData} 
                addToCart={addToCart} 
            />
            <Card style={{ color: "white", width: "100%", padding: "20px", overflow: "hidden" }} className='cat-card'>
                <p style={{ fontSize: "20px", textAlign: "justify" }}>
                    <img 
                        src="/gato.jpg"
                        alt="Imagen de gato" 
                        style={{
                            width: "25%",
                            height: "120px",
                            float: "left",
                            marginRight: "15px",
                        }}
                    />
                    Bienvenido a la página oficial de Intachables-Importaciones, donde podrás comprar nuestros productos desde tu celular u ordenador
                    desde la comodidad de tu hogar. No dudes en visitar nuestra <strong> "Tienda" </strong> para ver nuestro catálogo de productos y comprar alguno si es 
                    de tu interés.
                </p>
            </Card>
            <br />
            <br />
            <Card style={{ color: "white", width: "100%"}} className='dog-card'>
                <p style={{ fontSize: "20px" , textAlign: "justify"}}>
                    Para más información puedes visitar las secciones <strong> "Sobre Nosotros" </strong> y <strong> "Formas de Pago" </strong>
                    donde podrás obtener más información sobre nosotros y el cómo pagar por los productos a nuestra disposición. También en caso 
                    de querer contactarnos puede revisar nuestras redes sociales, llamar al número correspondiente en la página, enviar un mensaje por WhatsApp,
                    o contactarnos por correo electrónico en la sección de <strong> "Contacto" </strong>. 
                    <img 
                        src="/perro.JPG"
                        alt="Imagen de perro" 
                        style={{
                            width: "25%",
                            height: "100px",
                            float: "right",
                            marginRight: "15px",
                        }}
                    />
                </p>
            </Card>
        </>
    );
};

export default Home;
