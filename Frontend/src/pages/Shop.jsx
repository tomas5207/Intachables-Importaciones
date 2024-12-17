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
    const [showCategoryFilter, setShowCategoryFilter] = useState(false); // Estado para mostrar/ocultar filtro
    const productsPerPage = 6;

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
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) // Agregado para buscar por código
            );
        }

        setFilteredData(filteredProducts);
        setCurrentPage(1); // Reiniciar a la primera página si se aplican filtros o búsqueda
    }, [selectedCategories, selectedSubCategories, searchTerm, productsData]);

    const removeFilter = (filterName, type) => {
        if (type === 'category') {
            setSelectedCategories(prev => prev.filter(cat => cat !== filterName));
        } else if (type === 'subcategory') {
            setSelectedSubCategories(prev => prev.filter(sub => sub !== filterName));
        }
    };

    // Calcular los productos actuales para la página
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredData.length / productsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Toggle para mostrar/ocultar el filtro en pantallas pequeñas
    const toggleCategoryFilter = () => {
        setShowCategoryFilter(prev => !prev);
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

            {/* Botón para desplegar filtro de categorías en pantallas pequeñas */}
            <button 
                className="category-toggle-button"
                onClick={toggleCategoryFilter}
            >
                {showCategoryFilter ? 'Ocultar Filtro' : 'Ver Filtro'}
            </button>

            {/* Mostrar el filtro fuera de shop-container solo en móviles */}
            {showCategoryFilter && (
                <CategoryFilter 
                    onFilterSelect={handleFilterSelect} 
                    className="category-filter-mobile"
                />
            )}
            <br/>
            <div className="shop-container">
                {filteredData.length === 0 ? (
                    <div className="no-products-message">
                        <p>Oops... no hay productos en la tienda</p>
                    </div>
                ) : (
                    <ItemListContainer greeting="" productsData={currentProducts} addToCart={addToCart} />
                )}
            </div>

            {filteredData.length > 0 && (
                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo; Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
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
