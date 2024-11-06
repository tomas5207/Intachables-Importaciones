// SearchBar.jsx
import React from 'react';

const SearchBar = ({ onSearch }) => {
    const handleInputChange = (event) => {
        onSearch(event.target.value); // Llama al callback con el valor del input
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Buscar producto..."
                onChange={handleInputChange}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
