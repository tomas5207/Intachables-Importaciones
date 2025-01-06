import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onFilterSelect, className, onClose }) => {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        axios.get('https://intachables-importaciones-production.up.railway.app/categoria')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log('Error al obtener las categorías:', error);
            });
    }, []);

    const toggleSubcategories = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    return (
        <div className={`category-sidebar ${className || ''}`}>
            <div className="sidebar-header">
                <h3>Categorías</h3>
                <button className="close-button" onClick={onClose}>
                    ✕
                </button>
            </div>
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
        </div>
    );
};

export default CategoryFilter;
