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
    const [currentPage, setCurrentPage] = useState(1);
    const [showCategorySidebar, setShowCategorySidebar] = useState(false);
    const productsPerPage = 6;

    useEffect(() => {
        axios.get('https://intachables-importaciones-production.up.railway.app/producto')
            .then(response => {
                setProductsData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.log('Error al obtener productos:', error);
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

        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.Categorium && selectedCategories.includes(product.Categorium.nombre)
            );
        }

        if (selectedSubCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.SubCategorium && selectedSubCategories.includes(product.SubCategorium.nombre)
            );
        }

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                product.codigo.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filteredProducts);
        setCurrentPage(1);
    }, [selectedCategories, selectedSubCategories, searchTerm, productsData]);

    const removeFilter = (filterName, type) => {
        if (type === 'category') {
            setSelectedCategories(prev => prev.filter(cat => cat !== filterName));
        } else if (type === 'subcategory') {
            setSelectedSubCategories(prev => prev.filter(sub => sub !== filterName));
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredData.length / productsPerPage);

    return (
        <>
            {showCategorySidebar && (
                <div className="overlay" onClick={() => setShowCategorySidebar(false)}></div>
            )}
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
            <button className="category-toggle-button" onClick={() => setShowCategorySidebar(true)}>
                Ver Categorías
            </button>
            <CategoryFilter
                onFilterSelect={handleFilterSelect}
                className={showCategorySidebar ? 'visible' : ''}
                onClose={() => setShowCategorySidebar(false)}
            />
            <div className="shop-container">
                {filteredData.length === 0 ? (
                    <div className="no-products-message">
                        <p>Oops... no hay productos en la tienda</p>
                    </div>
                ) : (
                    <ItemListContainer 
                        greeting="" 
                        productsData={currentProducts} 
                        addToCart={addToCart} 
                    />
                )}
            </div>
            {filteredData.length > 0 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo; Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente &raquo;
                    </button>
                </div>
            )}
        </>
    );
};

export default Shop;
