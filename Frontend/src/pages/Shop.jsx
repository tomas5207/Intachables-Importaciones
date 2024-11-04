import React, { useEffect, useState } from 'react'
import ItemListContainer from '../components/ItemListContainer'
import ImageCarrusel from '../components/ImageCarrusel';
import axios from 'axios'
export const Shop = ({addToCart}) => {
    const [productsData, setProductsData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/producto')
        .then(response => {
        setProductsData(response.data)
        })
        .catch(error => {console.log(error)});
        }, [])
    
return (
    <>
    <ImageCarrusel PageRefrence="Tienda" reference="Home/Tienda"/>
    <ItemListContainer greeting="" productsData={productsData} addToCart={addToCart}/>
    </>
)
}
export default Shop