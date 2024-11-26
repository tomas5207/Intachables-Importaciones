import React, { useEffect, useState } from 'react';
import ItemListContainer from '../components/ItemListContainer';
import ImageCarrusel from '../components/ImageCarrusel';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

export const Shop = ({ addToCart }) => {
    const [productsData, setProductsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleFilterSelect = (filterName, type) => {
        if (type === 'category') {
            setSelectedCategories(prev => 
                prev.includes(filterName) ? prev.filter(cat => cat !== filterName) : [...prev, filterName]
            );
        } else if (type === 'subcategory') {
            setSelectedSubCategories(prev => 
                prev.includes(filterName) ? prev.filter(sub => sub !== filterName) : [...prev, filterName]
            );
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        let filteredProducts = productsData;

        // Filtrar por categorías seleccionadas
        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.Categorium && selectedCategories.includes(product.Categorium.nombre)
            );
        }

        // Filtrar por subcategorías seleccionadas
        if (selectedSubCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.SubCategorium && selectedSubCategories.includes(product.SubCategorium.nombre)
            );
        }

        // Filtrar por término de búsqueda
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filteredProducts);
    }, [selectedCategories, selectedSubCategories, searchTerm, productsData]);

    const removeFilter = (filterName, type) => {
        if (type === 'category') {
            setSelectedCategories(prev => prev.filter(cat => cat !== filterName));
        } else if (type === 'subcategory') {
            setSelectedSubCategories(prev => prev.filter(sub => sub !== filterName));
        }
    };

    return (
        <>
            <ImageCarrusel PageRefrence="Tienda" reference="Home/Tienda" />
            <SearchBar onSearch={handleSearch} />
            <div className="selected-filters">
                {selectedCategories.map(category => (
                    <span key={category} className="filter-tag">
                        {category} <button onClick={() => removeFilter(category, 'category')}>x</button>
                    </span>
                ))}
                {selectedSubCategories.map(subcategory => (
                    <span key={subcategory} className="filter-tag">
                        {subcategory} <button onClick={() => removeFilter(subcategory, 'subcategory')}>x</button>
                    </span>
                ))}
            </div>
            <div className="shop-container">
                <CategoryFilter onFilterSelect={(name, type) => handleFilterSelect(name, type)} />
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
