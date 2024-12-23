import ImageCarrusel from '../components/ImageCarrusel';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const About = () => {
  


    return (
      <>
      <ImageCarrusel PageRefrence="Sobre Nosotros" reference="Home/Sobre Nosotros"/>
      
      <div className="about" style={{width: '50%', height: '250px', borderBottom: '2px solid black'}}>
      <Link to="/">
          <img style={{width: '100%', height: '100%'}} src="../../public/Logo.jpg"/>
      </Link>
      </div>
      <p className="about" style={{ textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      Somos una joven empresa uruguaya fundada en 2020, impulsada por una pasión genuina por el bienestar 
      de las mascotas y un compromiso con la calidad y el servicio al cliente. Desde nuestros primeros pasos, 
      nos hemos dedicado a hacer más fácil y accesible el cuidado de las mascotas en los hogares de Uruguay, 
      brindando productos seleccionados que buscan un equilibrio entre calidad y precio.
      </p>
      <p className="about" style={{ textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      Nuestra historia comenzó en plena pandemia, un momento que desafió nuestra capacidad de adaptación y nos 
      motivó a construir algo propio, donde cada esfuerzo tuviera un impacto directo en la vida de nuestros clientes 
      y sus mascotas. Decidimos lanzarnos al mundo de la importación, con las arenas sanitarias para gatos como nuestro 
      primer producto estrella. La respuesta fue tan positiva que nos permitió posicionarnos rápidamente, cubriendo las 
      necesidades de dueños de gatos en todo el país.
      </p>
      <p className="about" style={{ textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      Nuestra misión es convertirnos en un referente confiable en el mercado de productos para mascotas, manteniendo una 
      relación cercana con nuestros clientes y ofreciendo productos que respondan a las necesidades reales de las mascotas 
      y sus dueños. Nos mueve la transparencia, la honestidad y el deseo de aportar algo significativo al mundo del cuidado de las mascotas.
      </p>
      <p className="about" style={{ textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      Hoy, seguimos creciendo con un sueño claro: expandir nuestro catálogo y ofrecer una gama completa de productos para perros y gatos que 
      acompañen a cada familia en el cuidado diario de sus mascotas. Creemos que las mascotas son parte de la familia, y nos esforzamos por ser 
      el aliado confiable que nuestros clientes eligen una y otra vez.
      </p>
      <p className="about" style={{ textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      ¿Nuestra filosofía? Calidad, accesibilidad y cercanía. Queremos que cada cliente, al elegirnos, sienta la confianza de saber que detrás de 
      cada producto está un equipo comprometido, dispuesto a brindar lo mejor en cada entrega.
      </p>
      </>
    )
}

export default About