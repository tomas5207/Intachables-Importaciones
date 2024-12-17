import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const CategoryFilter = ({ onFilterSelect, className }) => {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isMobile, setIsMobile] = useState(false); // Estado para saber si es móvil

    useEffect(() => {
        axios.get('http://localhost:5000/categoria')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log('Error al obtener las categorías:', error);
            });
        
        // Detectar el tamaño de la pantalla
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480); // Si el ancho de la pantalla es <= 480px
        };

        handleResize(); // Llamar una vez al cargar el componente
        window.addEventListener('resize', handleResize);

        // Limpiar el evento de resize al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSubcategories = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    return (
        <Card className={`category-filter ${className || ''}`}>
            <h3>Categorías</h3>
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.id} className="category-item">
                        <div
                            className="category-name"
                            onClick={() => onFilterSelect(category.nombre, 'category')}
                        >
                            {category.nombre}
                            {category.SubCategoria?.length > 0 && (
                                <button
                                    className="expand-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSubcategories(category.id);
                                    }}
                                >
                                    {expandedCategories[category.id] ? '-' : '+'} 
                                </button>
                            )}
                        </div>
                        {expandedCategories[category.id] && category.SubCategoria && (
                            <ul className="subcategory-list">
                                {category.SubCategoria.map((subcategory) => (
                                    <li key={subcategory.id}>
                                        <a
                                            className="subcategory-button"
                                            onClick={() => onFilterSelect(subcategory.nombre, 'subcategory')}
                                            style={{ color: 'white' }}
                                        >
                                            {subcategory.nombre}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default CategoryFilter;
