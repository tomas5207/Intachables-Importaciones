import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const CategoryFilter = ({ onFilterSelect }) => {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({}); // Estado para expandir/cerrar subcategorías

    useEffect(() => {
        axios.get('http://localhost:5000/categoria')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log('Error al obtener las categorías:', error);
            });
    }, []);

    // Manejar expansión/cierre de subcategorías
    const toggleSubcategories = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    return (
        <Card className="category-filter">
            <h3>Categorías</h3>
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.id} className="category-item">
                        <div
                            className="category-name"
                            onClick={() => onFilterSelect(category.nombre, 'category')} // Aquí indicamos que es categoría
                        >
                            {category.nombre}
                            {category.SubCategoria?.length > 0 && (
                                <button
                                    className="expand-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita seleccionar la categoría al expandir
                                        toggleSubcategories(category.id);
                                    }}
                                >
                                    {expandedCategories[category.id] ? '-' : '+'}
                                </button>
                            )}
                        </div>
                        {expandedCategories[category.id] && category.SubCategoria?.length > 0 && (
                            <ul className="subcategory-list">
                                {category.SubCategoria.map((sub) => (
                                    <li
                                        key={sub.id}
                                        onClick={() => onFilterSelect(sub.nombre, 'subcategory')} // Aquí indicamos que es subcategoría
                                        className="subcategory-item"
                                    >
                                        {sub.nombre}
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
