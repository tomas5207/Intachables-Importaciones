// Shop.jsx
import React, { useEffect, useState } from 'react';
import ItemListContainer from '../components/ItemListContainer';
import ImageCarrusel from '../components/ImageCarrusel';
import CategoryFilter from '../components/CategoryFilter';
import axios from 'axios';

export const Shop = ({ addToCart }) => {
    const [productsData, setProductsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/producto')
            .then(response => {
                setProductsData(response.data);
                setFilteredData(response.data); // Inicialmente muestra todos los productos
                console.log("Productos obtenidos:", response.data);
            })
            .catch(error => {
                console.log("Error al obtener productos:", error);
            });
    }, []);

    const handleFilterSelect = (category) => {
        setSelectedCategories((prevCategories) => {
            let updatedCategories;
            if (prevCategories.includes(category)) {
                // Remover la categoría si ya está seleccionada
                updatedCategories = prevCategories.filter(cat => cat !== category);
            } else {
                // Agregar la categoría si no está seleccionada
                updatedCategories = [...prevCategories, category];
            }

            return updatedCategories;
        });
    };
    
    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredData(productsData);
        } else {
            const filteredProducts = productsData.filter(
                product => product.Categorium && selectedCategories.includes(product.Categorium.nombre)
            );
            setFilteredData(filteredProducts);
        }
    }, [selectedCategories, productsData]);
    

    const removeCategory = (category) => {
        setSelectedCategories(prevCategories =>
            prevCategories.filter(cat => cat !== category)
        );
    };

    return (
        <>
            <ImageCarrusel PageRefrence="Tienda" reference="Home/Tienda" />
            <div className="selected-categories">
                    {selectedCategories.map(category => (
                        <span key={category} className="category-tag">
                            {category} <button onClick={() => removeCategory(category)}>x</button>
                        </span>
                    ))}
                </div>
            <div className="shop-container">
                <CategoryFilter onFilterSelect={handleFilterSelect} />
                <ItemListContainer greeting="" productsData={filteredData} addToCart={addToCart} />
            </div>
        </>
    );
};

export default Shop;
