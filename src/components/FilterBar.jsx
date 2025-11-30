import React from 'react';
import './FilterBar.css';

const FilterBar = ({ categories, activeCategory, onSelectCategory }) => {
    return (
        <div className="filter-bar-container">
            <div className="filter-bar">
                <button
                    className={`filter-bar-btn ${activeCategory === 'All' ? 'active' : ''}`}
                    onClick={() => onSelectCategory('All')}
                >
                    Todas las categorías
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        className={`filter-bar-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;

