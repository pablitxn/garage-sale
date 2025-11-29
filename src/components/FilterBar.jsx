import React from 'react';

const FilterBar = ({ categories, activeCategory, onSelectCategory }) => {
    return (
        <div className="filter-bar">
            <button
                className={activeCategory === 'All' ? 'active' : ''}
                onClick={() => onSelectCategory('All')}
            >
                All
            </button>
            {categories.map(category => (
                <button
                    key={category}
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
