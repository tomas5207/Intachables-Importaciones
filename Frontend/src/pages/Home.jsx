import React, { useEffect, useState } from 'react'
import ItemListContainer from '../components/ItemListContainer'
import axios from 'axios'

export const Home = ({addToCart}) => {

    const [productsData, setProductsData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/producto')
        .then(response => {
        setProductsData(response.data)
        })
        .catch(error => {console.log(error)});
        }, [])
    

return (
    <ItemListContainer greeting="Intachables-Importaciones.com" productsData={productsData} addToCart={addToCart}/>
)
}

export default Home