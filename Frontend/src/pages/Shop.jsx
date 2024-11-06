// Shop.jsx
import React, { useEffect, useState } from 'react';
import ItemListContainer from '../components/ItemListContainer';
import ImageCarrusel from '../components/ImageCarrusel';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar'; // Importa el nuevo componente
import axios from 'axios';

export const Shop = ({ addToCart }) => {
    const [productsData, setProductsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

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
                updatedCategories = prevCategories.filter(cat => cat !== category);
            } else {
                updatedCategories = [...prevCategories, category];
            }
            return updatedCategories;
        });
    };

    const handleSearch = (term) => {
        setSearchTerm(term); // Actualizar el término de búsqueda desde SearchBar
    };

    useEffect(() => {
        let filteredProducts = productsData;

        // Filtrar productos según las categorías seleccionadas
        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(
                product => product.Categorium && selectedCategories.includes(product.Categorium.nombre)
            );
        }

        // Filtrar productos según el término de búsqueda
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(
                product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filteredProducts);
    }, [selectedCategories, searchTerm, productsData]);

    const removeCategory = (category) => {
        setSelectedCategories(prevCategories =>
            prevCategories.filter(cat => cat !== category)
        );
    };


    return (
        <>
            <ImageCarrusel PageRefrence="Tienda" reference="Home/Tienda" />
            <SearchBar onSearch={handleSearch} />
            <div className="selected-categories">
                    {selectedCategories.map(category => (
                        <span key={category} className="category-tag">
                            {category} <button onClick={() => removeCategory(category)}>x</button>
                        </span>
                    ))}
                </div>
            <div className="shop-container">
                <CategoryFilter onFilterSelect={handleFilterSelect} />
                {filteredData.length === 0 ? (
                    <div className="no-products-message">
                        <p>Oops... no hay productos en la tienda</p>
                    </div>
                ) : (
                    <ItemListContainer greeting="" productsData={filteredData} addToCart={addToCart} />
                )}
            </div>
        </>
    );
};

export default Shop;
