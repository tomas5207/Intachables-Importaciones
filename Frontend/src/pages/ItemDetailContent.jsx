import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddToCartButton from '../components/AddToCartButton'; 

export const ItemDetailContent = ({ addToCart }) => {
  const [productsData, setProductsData] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState('');
  const [subcategoriaNombre, setSubcategoriaNombre] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://intachables-importaciones-production.up.railway.app/producto/${id}`)
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
    if (productsData.CategoriaId) {
      axios.get(`https://intachables-importaciones-production.up.railway.app/categoria/${productsData.CategoriaId}`)
        .then(response => {
          setCategoriaNombre(response.data.nombre);
          console.log("Nombre de la categoría:", response.data.nombre);
        })
        .catch(error => {
          console.log("Error al obtener la categoría:", error);
        });
    }
  }, [productsData.CategoriaId]);

  useEffect(() => {
    if (productsData.SubCategoriaId) {
      axios.get(`https://intachables-importaciones-production.up.railway.app/subcategoria/${productsData.SubCategoriaId}`)
        .then(response => {
          setSubcategoriaNombre(response.data.nombre);
          console.log("Nombre de la subcategoría:", response.data.nombre);
        })
        .catch(error => {
          console.log("Error al obtener la subcategoría:", error);
        });
    }
  }, [productsData.SubCategoriaId]);

  return (
    <>
      <Card key={productsData.id} className="item-card">
        <Card.Img variant="top" src={productsData.imagen} />
      </Card>

      <Card className="button-detail-card customButtonDetail">
        <AddToCartButton product={productsData} addToCart={addToCart} />
      </Card>

      <Card className="pay-banner-card payBanner">
        <Card.Img src="../../public/efectivo.png" className='imagenEfectivo'/>
        <span className="pay-text-left">Paga en efectivo</span>
        <span className="pay-text-middle">O</span>
        <Card.Img src="../../public/mercadoPago.png" className='imagenMercado'/>
        <span className="pay-text-right">con MercadoPago</span>
      </Card>

      <Link to="/payform">
        <span className="pay-info-link">
          Click aquí para más información sobre metodos de pago
        </span>
      </Link>

      <ul className="product-details-list">
        <li><a>Precio por unidad: ${productsData.precio}</a></li>
        <li><a>Código: {productsData.codigo}</a></li>
        <li><a>Categoría: {categoriaNombre}</a></li>
        <li><a>Subcategoría: {subcategoriaNombre}</a></li>
        <li><a>Colores: {productsData.color}</a></li>
      </ul>

        <h4 className="description-title">Descripción:</h4>
        <p className="description-text">{productsData.descripción}</p>
    </>
  );
};

export default ItemDetailContent;
