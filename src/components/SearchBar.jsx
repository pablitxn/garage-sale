import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    const handleClear = () => {
        onSearchChange('');
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path d="M21 21l-4.35-4.35" strokeWidth="2" />
                </svg>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar por nombre o descripción..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button className="clear-btn" onClick={handleClear} aria-label="Limpiar búsqueda">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" />
                            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
