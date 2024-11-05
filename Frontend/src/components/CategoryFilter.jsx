// components/CategoryFilter.jsx
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const CategoryFilter = ({ onFilterSelect }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/categoria')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log('Error al obtener las categorías:', error);
            });
    }, []);

    return (
        <Card className="category-filter">
            <h3>Categorías</h3>
            <ul className="category-list">
                {categories.map((category) => (
                    <li 
                        key={category.id} 
                        onClick={() => onFilterSelect(category.nombre)}
                        className="category-item"
                    >
                        {category.nombre}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default CategoryFilter;
